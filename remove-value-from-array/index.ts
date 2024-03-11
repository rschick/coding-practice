export function removeElement(nums: number[], val: number): number {
  let p1 = 0;
  let p2 = nums.length - 1;
  let k = 0;

  while (p2 >= p1) {
    while (p2 >= p1 && nums[p1] !== val) {
      p1++;
      k++;
    }

    while (p2 >= p1 && nums[p2] === val) {
      p2--;
    }

    if (p2 > p1) {
      const tmp = nums[p2];
      nums[p2] = nums[p1];
      nums[p1] = tmp;
    }
  }

  return k;
}
