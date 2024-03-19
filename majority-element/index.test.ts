import test from "node:test";
import assert from "node:assert";

import { majorityElement } from ".";

[
  {
    nums: [3, 2, 3],
    expectedResult: 3,
  },
].forEach(({ nums, expectedResult }, index) => {
  test(`case ${index}`, () => {
    const result = majorityElement(nums);
    assert.equal(result, expectedResult);
  });
});
