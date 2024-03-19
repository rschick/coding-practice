export function rotate(nums: number[], k: number): void {
  const n = nums.length;

  let offset = 0;
  let to = 0;
  let temp = nums[0];
  let i = 0;

  if (k === 0 || k === n) {
    return;
  }

  for (;;) {
    let from = (to - k + k * n) % n;

    if (from === offset) {
      nums[to] = temp;
      offset++;
      to = offset;
      i++;
      from = (to - k + k * n) % n;
      temp = nums[to];
    }

    if (i === n) {
      return;
    }

    nums[to] = nums[from];
    i++;

    to = from;
  }
}
