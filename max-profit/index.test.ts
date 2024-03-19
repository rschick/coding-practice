import test from "node:test";
import assert from "node:assert";

import { maxProfit } from ".";

[
  {
    prices: [7, 1, 5, 3, 6, 4],
    expected: 5,
  },
  {
    prices: [7, 6, 4, 3, 1],
    expected: 0,
  },
  {
    prices: [2, 4, 1],
    expected: 2,
  },
  {
    prices: [2, 1, 2, 0, 1],
    expected: 1,
  },
].forEach(({ prices, expected }, index) => {
  test(`case ${index}`, () => {
    assert.equal(maxProfit(prices), expected);
  });
});
