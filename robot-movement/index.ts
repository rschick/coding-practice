// Input: a grid of 1s and 0s, each row is the same length, and the number of robots.
// Each row represents the locations of robots at a step in time
// 1 represents a robot at that position
// 0 represents no robot at that position

// Output: true if the grid represents valid robot movement, false otherwise

// Notes:
// - robots can move one position left/right (but not off the ends of the rows)
// - robots can't occupy the same spot (can't collide, which means they also can't cross over each other)
// - each row is the same length
// - a robot does not necessarily move in a given step
// - there are >= 2 rows, and each row is the same length
// - each entry in a row is either 1 or 0, no other values will appear

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

// Ideas:
// - we can iterate through the rows, and compare each row to the previous row
// - we can calculate the number of robots in each row, and return false if it doesn't match numRobots
// - if a row contains numRobots ones, we know there wasn't a collision and robots didn't fall off the ends
// - so it's enough to check that if there is a 1 in the current row at an index, there must be a 1 in
//   the previous row at the same index +/- 1
// - we can only use a 1 from the previous row once, we could maybe keep track of which previous location
//   mapped to the current location
// - we could get the list of indices and use that.

// For this example grid = [[1, 0, 0, 1], [1, 1, 0, 0]], numRobots = 2

// previous indices = [0, 3]
// current indices = [0, 1]

// since robots can't cross each other, we can loop through each value and it must be
// equal to the value in the previous list +/- 1. So compare 0, 0 => ok, and 1, 3 and since 3 - 1 = 2, we'd return false.

export function isValidGrid(grid: number[][], numRobots: number) {
  if (grid.length < 2) {
    // invalid grid
    return false;
  }

  for (let row = 1; row < grid.length; row++) {
    let numRobotsInRow = 0;

    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col]) {
        numRobotsInRow++;

        // returns whether the step from the first row to the 2nd is valid
        if (!validRows(grid[row - 1], grid[row])) {
          return false;
        }
      }
    }

    if (numRobotsInRow !== numRobots) {
      return false;
    }
  }

  return true;
}

function getRobotIndices(row: number[]) {
  const indices = [];

  for (let i = 0; i < row.length; i++) {
    if (row[i]) {
      indices.push(i);
    }
  }

  return indices;
}

function validRows(row1: number[], row2: number[]) {
  const indices1 = getRobotIndices(row1);
  const indices2 = getRobotIndices(row2);

  if (indices1.length !== indices2.length) {
    return false;
  }

  for (let index = 0; index < indices1.length; index++) {
    if (Math.abs(indices1[index] - indices2[index]) > 1) {
      return false;
    }
  }

  return true;
}
