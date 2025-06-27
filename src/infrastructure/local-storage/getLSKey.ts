export function getLSKey(sessionId: string): string {
  return `userData-${sessionId}`;
}