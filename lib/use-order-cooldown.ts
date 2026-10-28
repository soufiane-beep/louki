const STORAGE_KEY = "louki:last-order-sent-at";

// Fenêtre pendant laquelle on avertit (sans bloquer) avant un nouvel envoi.
export const ORDER_COOLDOWN_MS = 90_000;

function getLastOrderSentAt(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

export function markOrderSent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Stockage indisponible (navigation privée, quota) : le cooldown est une
    // simple aide UX, on échoue silencieusement plutôt que de bloquer l'envoi.
  }
}

export function getRemainingCooldownMs(): number {
  const last = getLastOrderSentAt();
  if (last === null) return 0;
  return Math.max(0, ORDER_COOLDOWN_MS - (Date.now() - last));
}
