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