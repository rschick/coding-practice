import test from "node:test";
import assert from "node:assert";

import { twoSum } from ".";

[
  {
    nums: [2, 7, 11, 15],
    target: 9,
    expected: [1, 2],
  },
  {
    nums: [2, 3, 4],
    target: 6,
    expected: [1, 3],
  },
  {
    nums: [-1, 0],
    target: -1,
    expected: [1, 2],
  },
  {
    nums: [5, 25, 75],
    target: 100,
    expected: [2, 3],
  },
  {
    nums: [3, 24, 50, 79, 88, 150, 345],
    target: 200,
    expected: [3, 6],
  },
  {
    nums: [-1, -1, 1, 1, 1],
    target: -2,
    expected: [1, 2],
  },
].forEach(({ nums, target, expected }, index) => {
  test(`case ${index}`, () => {
    assert.deepEqual(twoSum(nums, target), expected);
  });
});
