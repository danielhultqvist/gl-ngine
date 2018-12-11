/**
 * Rotating/circular array element retrieval. Restarts index counting if out of bounds, in both
 * directions
 * @param elements Array to pick element from. Must be contain at least one element
 * @param index Index of element to pick
 */
export function at<T>(elements: T[], index: number): T {
  if (index >= 0) {
    return elements[(index % elements.length)];
  } else {
    const offset = (-index) % elements.length;
    return offset == 0 ? elements[0] : elements[elements.length - offset];
  }
}

/**
 * Extracts an array from a input array, starting from start index to end index
 * @param elements Array to extract sub array from
 * @param start Inclusive start position
 * @param end Inclusive end position
 */
export function subarray<T>(elements: T[], start: number, end: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < elements.length; ++i) {
    if (start < end) {
      if (i >= start && i <= end) {
        result.push(elements[i]);
      }
    } else {
      if (i >= start || i <= end) {
        result.push(elements[i]);
      }
    }
  }
  return result;
}