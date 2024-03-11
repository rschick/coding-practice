import test from "node:test";
import assert from "node:assert";

import { removeElement } from ".";

[
  {
    nums: [3, 2, 2, 3],
    val: 3,
    expectedResult: 2,
    expectedValues: [2, 2],
  },
  {
    nums: [0, 1, 2, 2, 3, 0, 4, 2],
    val: 2,
    expectedResult: 5,
    expectedValues: [0, 1, 3, 0, 4],
  },
  {
    nums: [2],
    val: 3,
    expectedResult: 1,
    expectedValues: [2],
  },
  {
    nums: [3],
    val: 3,
    expectedResult: 0,
    expectedValues: [],
  },
  {
    nums: [1, 2, 3],
    val: 1,
    expectedResult: 2,
    expectedValues: [2, 3],
  },
].forEach(({ nums, val, expectedResult, expectedValues }, index) => {
  test(`case ${index}`, () => {
    const result = removeElement(nums, val);
    assert.equal(result, expectedResult);

    assert(
      nums
        .slice(0, expectedValues.length)
        .every((v) => expectedValues.includes(v))
    );

    assert(
      expectedValues.every((v) =>
        nums.slice(0, expectedValues.length).includes(v)
      )
    );
  });
});
