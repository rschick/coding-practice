// Example: input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7] output: 8 (index of element 9)

function findPeak(input: number[]) {
  let start = 0;
  let end = input.length - 1;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (input[mid] > input[mid + 1]) {
      end = mid;
    } else {
      start = mid + 1;
    }
  }

  return start;
}

console.log(findPeak([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7])); // 8
