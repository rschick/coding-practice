import test from "node:test";
import assert from "node:assert";

import { rotate } from ".";

[
  {
    nums: [1, 2],
    k: 1,
    expected: [2, 1],
  },
  {
    nums: [1, 2, 3, 4],
    k: 2,
    expected: [3, 4, 1, 2],
  },
  {
    nums: [1, 2, 3, 4, 5],
    k: 1,
    expected: [5, 1, 2, 3, 4],
  },
  {
    nums: [1, 2, 3, 4, 5],
    k: 2,
    expected: [4, 5, 1, 2, 3],
  },
  {
    nums: [-1, -100, 3, 99],
    k: 2,
    expected: [3, 99, -1, -100],
  },
  {
    nums: [1, 2],
    k: 0,
    expected: [1, 2],
  },
  {
    nums: [1, 2],
    k: 2,
    expected: [1, 2],
  },
  {
    nums: [1, 2],
    k: 3,
    expected: [2, 1],
  },
  {
    nums: [-1, -100, 3, 99],
    k: 3,
    expected: [-100, 3, 99, -1],
  },
  {
    nums: [1, 2, 3, 4, 5, 6],
    k: 2,
    expected: [5, 6, 1, 2, 3, 4],
  },
  {
    nums: [1, 2, 3, 4, 5, 6],
    k: 4,
    expected: [3, 4, 5, 6, 1, 2],
  },
].forEach(({ nums, k, expected }, index) => {
  test(`case ${index}`, () => {
    rotate(nums, k);
    assert.deepEqual(nums, expected);
  });
});
