export function generateSessionID() {
  return Math.random().toString(36).substring(7);
}
