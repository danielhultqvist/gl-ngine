/**
 * Clamps the value according to its absolute, keeping the sign of the value
 * @param max The max absolute value where clamping occurs
 * @param value The value to potentially clamp
 */
export function clampAbsolute(max: number, value: number) {
  const clampedValue  = Math.min(max, Math.abs(value));
  return value >= 0 ? clampedValue : -clampedValue;
}
