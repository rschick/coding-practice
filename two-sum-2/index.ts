function find(
  numbers: number[],
  value: number,
  start: number,
  end: number
): number | undefined {
  while (start <= end) {
    const midIndex = Math.floor((end - start) / 2) + start;
    const midValue = numbers[midIndex];
    if (value === midValue) {
      return midIndex;
    } else if (value < midValue) {
      end = end === midIndex ? end - 1 : midIndex;
    } else if (value > midValue) {
      start = start === midIndex ? start + 1 : midIndex;
    }
  }

  return;
}

export function twoSum(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const diff = target - numbers[i];
    const match =
      diff < numbers[i]
        ? find(numbers, diff, 0, i - 1)
        : find(numbers, diff, i + 1, numbers.length - 1);

    if (match !== undefined) {
      return [i + 1, match + 1];
    }
  }

  return [];
}
