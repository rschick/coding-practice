export function majorityElement(nums: number[]): number {
  let candidate;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }

  return candidate || 0;
}

export function majorityElementSlow(nums: number[]): number {
  const counts = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    if (!counts.get(nums[i])) {
      counts.set(nums[i], 0);
    }
    counts.set(nums[i], counts.get(nums[i])! + 1);
  }

  let maxCount = 0;
  let maxNum = 0;

  for (const [num, count] of counts.entries()) {
    if (count > maxCount) {
      maxNum = num;
      maxCount = count;
    }
  }

  return maxNum;
}
