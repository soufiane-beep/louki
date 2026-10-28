// Validation volontairement souple : accepte les formats belges et internationaux
// courants (espaces, points, tirets, parenthèses, "+" initial) sans imposer un format strict.
const PHONE_CHARS_REGEX = /^\+?[0-9\s().-]+$/;

export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!PHONE_CHARS_REGEX.test(trimmed)) return false;
  const digitCount = trimmed.replace(/\D/g, "").length;
  return digitCount >= 8 && digitCount <= 15;
}
