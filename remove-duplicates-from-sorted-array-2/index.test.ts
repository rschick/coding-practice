import test from "node:test";
import assert from "node:assert";

import { removeDuplicates } from ".";

[
  {
    nums: [1, 1, 1, 2, 2, 3],
    expectedResult: 5,
    expectedValues: [1, 1, 2, 2, 3],
  },
  {
    nums: [0, 0, 1, 1, 1, 1, 2, 3, 3],
    expectedResult: 7,
    expectedValues: [0, 0, 1, 1, 2, 3, 3],
  },
  {
    nums: [1, 1, 1],
    expectedResult: 2,
    expectedValues: [1, 1],
  },
  {
    nums: [1, 1, 1, 2, 2, 3, 3],
    expectedResult: 6,
    expectedValues: [1, 1, 2, 2, 3, 3],
  },
].forEach(({ nums, expectedResult, expectedValues }, index) => {
  test(`case ${index}`, () => {
    const result = removeDuplicates(nums);
    console.log(result, nums);
    assert.equal(result, expectedResult);
    assert.deepStrictEqual(
      nums.slice(0, expectedValues.length),
      expectedValues
    );
  });
});
