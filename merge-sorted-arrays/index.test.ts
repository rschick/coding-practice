import test from "node:test";
import assert from "node:assert";

import { merge } from ".";

[
  {
    nums1: [1, 2, 3, 0, 0, 0],
    m: 3,
    nums2: [2, 5, 6],
    n: 3,
    expected: [1, 2, 2, 3, 5, 6],
  },
  {
    nums1: [1, 3, 5, 0, 0, 0],
    m: 3,
    nums2: [2, 4, 6],
    n: 3,
    expected: [1, 2, 3, 4, 5, 6],
  },
  {
    nums1: [4, 5, 6, 0, 0, 0],
    m: 3,
    nums2: [1, 2, 3],
    n: 3,
    expected: [1, 2, 3, 4, 5, 6],
  },
  {
    nums1: [2, 4, 6, 8, 0, 0, 0, 0, 0],
    m: 4,
    nums2: [1, 3, 5, 7, 9],
    n: 5,
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    nums1: [0],
    m: 0,
    nums2: [1],
    n: 1,
    expected: [1],
  },
  {
    nums1: [],
    m: 0,
    nums2: [],
    n: 0,
    expected: [],
  },
].forEach(({ nums1, m, nums2, n, expected }, index) => {
  test(`case ${index}`, () => {
    merge(nums1, m, nums2, n);
    assert.deepStrictEqual(nums1, expected);
  });
});
