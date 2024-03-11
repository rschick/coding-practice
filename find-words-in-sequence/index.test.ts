import test from "node:test";
import assert from "node:assert";

import { findWords } from ".";

[
  {
    input: "CARACE",
    words: ["CAR", "RACE", "CARACE"],
    expected: ["CAR", "RACE", "CARACE"],
  },
  {
    input: "ABCDECARACECARSDKJHA:KJS:DL",
    words: ["CAR", "RACE", "RACECAR"],
    expected: ["CAR", "RACE", "RACECAR", "CAR"],
  },
].forEach(({ input, words, expected }, index) => {
  test(`case ${index}`, () => {
    const result = findWords(input, words);

    assert(result.length >= expected.length, "fewer results than expected");
    assert(result.length <= expected.length, "more results than expected");

    for (const word of result) {
      assert(expected.includes(word), `unexpected word: ${word}`);
    }

    for (const word of expected) {
      assert(result.includes(word), `word not found: ${word}`);
    }
  });
});
