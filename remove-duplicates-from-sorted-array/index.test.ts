import test from "node:test";
import assert from "node:assert";

import { removeDuplicates } from ".";

[
  {
    nums: [0, 1, 2, 3, 4],
    expectedResult: 5,
    expectedValues: [0, 1, 2, 3, 4],
  },
  {
    nums: [2, 2, 3, 3],
    expectedResult: 2,
    expectedValues: [2, 3],
  },
  {
    nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
    expectedResult: 5,
    expectedValues: [0, 1, 2, 3, 4],
  },
  {
    nums: [],
    expectedResult: 0,
    expectedValues: [],
  },
].forEach(({ nums, expectedResult, expectedValues }, index) => {
  test(`case ${index}`, () => {
    const result = removeDuplicates(nums);
    assert.equal(result, expectedResult);
    assert.deepStrictEqual(
      nums.slice(0, expectedValues.length),
      expectedValues
    );
  });
});
