/**
 * Clamps the value according to its absolute, keeping the sign of the value
 * @param max The max absolute value where clamping occurs
 * @param value The value to potentially clamp
 */
export function clampAbsolute(max: number, value: number) {
  const clampedValue = Math.min(max, Math.abs(value));
  return value >= 0 ? clampedValue : -clampedValue;
}

/**
 * Reduced the signed value by specified value
 * @param signedValue The signed value to subtract from
 * @param valueToSubtract The value to subtract. Should be positive
 */
export function subtractSigned(signedValue: number, valueToSubtract: number) {
  const absoluteValueToSubtract = Math.abs(valueToSubtract);
  return signedValue < 0
    ? signedValue + absoluteValueToSubtract
    : signedValue - absoluteValueToSubtract;
}
