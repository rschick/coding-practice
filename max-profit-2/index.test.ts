import test from "node:test";
import assert from "node:assert";

import { maxProfit } from ".";

[
  // {
  //   prices: [7, 1, 5, 3, 6, 4],
  //   expected: 7,
  // },
  {
    prices: [3, 3],
    expected: 0,
  },
  // {
  //   prices: [1, 2, 3, 4, 5],
  //   expected: 4,
  // },
  // {
  //   prices: [7, 6, 4, 3, 1],
  //   expected: 0,
  // },
].forEach(({ prices, expected }, index) => {
  test(`case ${index}`, () => {
    assert.equal(maxProfit(prices), expected);
  });
});
