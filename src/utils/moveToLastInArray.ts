export function moveToLastInArray<T>(array: T[], element: T): T[] {
  if (!array.includes(element)) {
    return array;
  }
  return array.filter((el) => el !== element).concat(element);
}
