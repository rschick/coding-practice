import test from "node:test";
import assert from "node:assert";

import { isValidGrid } from ".";

// Example: grid = [[1, 0, 0, 1], [0, 1, 1, 0]], numRobots = 2
// Output: true
// Explanation:
// - the first robot moved right one position, the 2nd robot moved left one position.
// - numRobots matches the number of robots

// Example: grid = [[1, 0, 0, 1], [1, 1, 0, 0]], numRobots = 2
// Output: false
// Explanation: the 2nd robot moved more than one position left

// Example: grid = [[1, 1, 0, 0], [0, 1, 0, 0]], numRobots = 2
// Output: false
// Explanation: the 1st robot either collided with the 2nd, or moved off the end of the array

[
  {
    grid: [
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    numRobots: 2,
    expectedResult: true,
  },
  {
    grid: [
      [1, 0, 0, 1],
      [1, 1, 0, 0],
    ],
    numRobots: 2,
    expectedResult: false,
  },
  {
    grid: [
      [1, 0, 0, 1],
      [0, 1, 0, 0],
    ],
    numRobots: 2,
    expectedResult: false,
  },
].forEach(({ grid, numRobots, expectedResult }, index) => {
  test(`case ${index}`, () => {
    const result = isValidGrid(grid, numRobots);
    assert.equal(result, expectedResult);
  });
});
