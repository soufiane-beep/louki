interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: "sm" | "md";
}

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  size = "md",
}: QuantityStepperProps) {
  const btnSize = size === "sm" ? "h-6 w-6 text-xs" : "h-8 w-8 text-sm";

  return (
    <div className="flex items-center gap-2 font-display">
      <button
        type="button"
        aria-label="Retirer un"
        onClick={onDecrement}
        className={`flex ${btnSize} items-center justify-center rounded-full bg-ink text-cream transition-transform hover:scale-105`}
      >
        −
      </button>
      {/* Fond propre (indépendant du bg de la carte parente) pour rester lisible sur clair et sombre. */}
      <span className="min-w-4 rounded-full bg-cream px-1.5 py-0.5 text-center text-ink tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Ajouter un"
        onClick={onIncrement}
        className={`flex ${btnSize} items-center justify-center rounded-full bg-ink text-cream transition-transform hover:scale-105`}
      >
        +
      </button>
    </div>
  );
}
