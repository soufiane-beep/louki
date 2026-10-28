"use client";

import { useEffect, useId, useRef, useState } from "react";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface NominatimResult {
  lat: string;
  lon: string;
  address?: {
    road?: string;
    house_number?: string;
    postcode?: string;
    city?: string;
    town?: string;
    municipality?: string;
    suburb?: string;
  };
}

interface Suggestion {
  id: string;
  label: string;
  // true = adresse complète (rue + numéro) sélectionnable directement.
  // false = rue seule : la sélectionner ne fait que compléter le champ, le numéro reste à taper.
  final: boolean;
}

const MIN_QUERY_LENGTH = 5;
const SEARCH_DEBOUNCE_MS = 600;

// Les noms bruxellois bilingues sont formatés "Français - Néerlandais" (ex. "Rue Neuve -
// Nieuwstraat") ; on ne garde que la partie française pour le message WhatsApp.
function frenchPart(text: string): string {
  return text.split(" - ")[0].trim();
}

function cityOf(addr: NonNullable<NominatimResult["address"]>): string {
  return frenchPart(addr.city || addr.town || addr.municipality || addr.suburb || "");
}

function formatStreetSuggestion(result: NominatimResult): string | null {
  const addr = result.address;
  if (!addr?.road) return null;
  const city = cityOf(addr);
  return city ? `${frenchPart(addr.road)}, ${city}` : frenchPart(addr.road);
}

function formatFullSuggestion(result: NominatimResult): string | null {
  const addr = result.address;
  const houseNumber = addr?.house_number?.split(";")[0];
  if (!addr?.road || !houseNumber) return null;
  const road = frenchPart(addr.road);
  const parts = [`${road} ${houseNumber}`];
  const locality = [addr.postcode, cityOf(addr)].filter(Boolean).join(" ");
  if (locality) parts.push(locality);
  return parts.join(", ");
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder,
  className,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  // Nominatim (OSM) limite fortement son API publique : au premier refus, on coupe les
  // suggestions pour la session. La saisie libre reste toujours possible.
  const suggestionsDisabledRef = useRef(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const runSearch = (text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (suggestionsDisabledRef.current || text.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    const hasNumber = /\d/.test(text);
    const currentRequestId = ++requestIdRef.current;
    setIsLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          format: "jsonv2",
          addressdetails: "1",
          limit: "8",
          countrycodes: "be",
          q: text,
        });
        const res = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
          headers: { Accept: "application/json" },
        });
        if (res.status === 429 || res.status === 403) suggestionsDisabledRef.current = true;
        if (!res.ok || currentRequestId !== requestIdRef.current) return;
        const data: NominatimResult[] = await res.json();

        const seen = new Set<string>();
        const results: Suggestion[] = [];
        for (const item of data) {
          const label = hasNumber ? formatFullSuggestion(item) : formatStreetSuggestion(item);
          if (!label || seen.has(label)) continue;
          seen.add(label);
          results.push({ id: `${item.lat}-${item.lon}`, label, final: hasNumber });
        }

        setSuggestions(results);
        setHighlightedIndex(-1);
        setIsOpen(results.length > 0);
      } catch {
        if (currentRequestId === requestIdRef.current) setSuggestions([]);
      } finally {
        if (currentRequestId === requestIdRef.current) setIsLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);
  };

  // La saisie libre est toujours acceptée : les suggestions ne sont qu'une aide, pour ne
  // jamais bloquer une commande si l'adresse est inconnue d'OSM ou si le service est indisponible.
  const handleInputChange = (text: string) => {
    setQuery(text);
    onChange(text);
    runSearch(text);
  };

  const handleSelect = (suggestion: Suggestion) => {
    if (suggestion.final) {
      setQuery(suggestion.label);
      onChange(suggestion.label);
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // Rue choisie : on complète le champ et on laisse l'utilisateur taper le numéro.
    const streetName = suggestion.label.split(",")[0];
    const nextQuery = `${streetName} `;
    setQuery(nextQuery);
    onChange(nextQuery);
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className={className}
      />
      {isOpen && suggestions.length > 0 && (
        <ul id={listboxId} role="listbox" className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-ink/10 bg-white shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li key={suggestion.id}>
              <button
                type="button"
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(suggestion)}
                className={`block w-full px-4 py-2 text-left font-body text-sm text-ink ${
                  index === highlightedIndex ? "bg-peach/30" : "hover:bg-peach/30"
                }`}
              >
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {isLoading && (
        <p className="mt-1 px-1 font-body text-xs text-ink/40">Recherche en cours…</p>
      )}
      {!isLoading && query.trim().length > 0 && !/\d/.test(query) && (
        <p className="mt-1 px-1 font-body text-xs text-ink/40">
          Pensez à indiquer le numéro de la maison.
        </p>
      )}
    </div>
  );
}
