/** Split long hero hooks into balanced lines for premium readability. */
export function splitHeadline(text: string): string[] {
  const trimmed = text.trim();
  const q = trimmed.indexOf("?");
  if (q !== -1) {
    const first = trimmed.slice(0, q + 1).trim();
    const rest = trimmed.slice(q + 1).trim();
    return rest ? [first, rest] : [first];
  }

  const comma = trimmed.indexOf(",");
  if (comma !== -1 && comma > 12 && comma < trimmed.length * 0.55) {
    const first = trimmed.slice(0, comma + 1).trim();
    const rest = trimmed.slice(comma + 1).trim();
    return rest ? [first, rest] : [first];
  }

  return [trimmed];
}
