import test from "node:test";
import assert from "node:assert";

import { minSubArrayLen } from ".";

[
  {
    nums: [2, 3, 1, 2, 4, 3],
    target: 7,
    expected: 2,
  },
  {
    nums: [1, 4, 4],
    target: 4,
    expected: 1,
  },
  {
    nums: [1, 1, 1, 1, 1, 1, 1, 1],
    target: 11,
    expected: 0,
  },
  {
    nums: [1, 2, 3, 4, 5],
    target: 11,
    expected: 3,
  },
].forEach(({ nums, target, expected }, index) => {
  test(`case ${index}`, () => {
    assert.equal(minSubArrayLen(target, nums), expected);
  });
});
