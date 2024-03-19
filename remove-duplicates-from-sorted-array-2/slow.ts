export function removeDuplicates(nums: number[]): number {
  let last = nums[0];
  let consecutive = 1;
  let k = nums.length;

  for (let i = 1; i < k; i++) {
    if (nums[i] === last) {
      consecutive++;
    } else {
      console.log(`Saw ${consecutive} ${last}`);
      if (consecutive > 2) {
        // shift elements left by consecutive - 2
        for (let j = i; j < nums.length; j++) {
          nums[j - consecutive + 2] = nums[j];
        }

        k -= consecutive - 2;
        i -= consecutive - 2;
      }

      last = nums[i];
      consecutive = 1;
    }
  }

  if (consecutive > 2) {
    k -= consecutive - 2;
  }

  return k;
}
