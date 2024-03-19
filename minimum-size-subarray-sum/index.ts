export function minSubArrayLen(target: number, nums: number[]): number {
  let start = 0;
  let end = 0;
  let sum = nums[0];
  let min;

  while (end < nums.length) {
    if (sum >= target) {
      const len = end - start + 1;
      min = Math.min(min ?? nums.length, len);
      start++;
      end = start;
      sum = nums[start];
    } else if (sum > target) {
      start++;
      end = start;
      sum = nums[start];
    } else {
      end++;
      sum += nums[end];
    }
  }

  return min ?? 0;
}
