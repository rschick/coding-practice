export function removeDuplicates(nums: number[]): number {
  let slow = 0;
  let consecutive = 1;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      consecutive = 1;
    } else {
      consecutive++;

      if (consecutive === 2) {
        slow++;
      }
    }

    nums[slow] = nums[fast];
  }

  return slow + 1;
}
