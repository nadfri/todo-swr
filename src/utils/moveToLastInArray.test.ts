import { moveToLastInArray } from './moveToLastInArray';

describe('moveToLastInArray', () => {
  it('should move the specified element to the end of the array', () => {
    const array = [1, 2, 3, 4];
    const element = 2;
    const result = moveToLastInArray(array, element);
    expect(result).toEqual([1, 3, 4, 2]);
  });

  it('should return the same array if the element is not found', () => {
    const array = [1, 2, 3, 4];
    const element = 5;
    const result = moveToLastInArray(array, element);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle an empty array', () => {
    const array: number[] = [];
    const element = 1;
    const result = moveToLastInArray(array, element);
    expect(result).toEqual([]);
  });

  it('should handle an array with one element', () => {
    const array = [1];
    const element = 1;
    const result = moveToLastInArray(array, element);
    expect(result).toEqual([1]);
  });

  it('should handle an array with multiple occurrences of the element', () => {
    const array = [1, 2, 3, 2, 4];
    const element = 2;
    const result = moveToLastInArray(array, element);
    expect(result).toEqual([1, 3, 4, 2]);
  });
});
