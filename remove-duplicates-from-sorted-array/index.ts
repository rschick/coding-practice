export function removeDuplicates(nums: number[]): number {
  if (nums.length == 0) {
    return 0;
  }

  let p1 = 0;
  let p2 = 1;

  for (;;) {
    while (p2 < nums.length && nums[p2] === nums[p1]) {
      p2++;
    }

    if (p2 < nums.length) {
      p1++;
      nums[p1] = nums[p2];
      p2++;
    } else {
      break;
    }
  }

  return p1 + 1;
}
