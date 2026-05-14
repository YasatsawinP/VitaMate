// Centralized client-side AI availability manager.
// Module-level state persists across React renders within the same browser session.

const COOLDOWN_MS = 45_000;

let cooldownExpiry = 0;
let warnedThisCooldown = false;

/** True if Gemini requests should proceed; false if we are in a rate-limit cooldown. */
export function isAIAvailable(): boolean {
  return Date.now() >= cooldownExpiry;
}

/**
 * Start (or extend) a cooldown window after a 429 response.
 * Logs exactly once per cooldown window so the console stays clean.
 */
export function activateCooldown(): void {
  const now = Date.now();
  if (now >= cooldownExpiry) {
    cooldownExpiry = now + COOLDOWN_MS;
    warnedThisCooldown = false;
  }
  if (!warnedThisCooldown) {
    const secs = Math.round((cooldownExpiry - Date.now()) / 1000);
    console.warn(`[VitaMate] Gemini cooling down for ${secs}s → using local fallback`);
    warnedThisCooldown = true;
  }
}

/** Milliseconds remaining in the current cooldown window (0 when not in cooldown). */
export function getRemainingCooldown(): number {
  return Math.max(0, cooldownExpiry - Date.now());
}
