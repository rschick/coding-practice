import { LinkedList } from "./linked-list";

const list = LinkedList.build(
  ["a", "b", "c", "d", "e", "f", "g", "h", "i"].map((key) => ({ key }))
);

// for (const item of list) {
//   console.log(item.key);
// }

// create a loop
list.addLink("i", "a");

const loopStart = list.detectLoop();

console.log(
  loopStart
    ? `detected a loop which starts at: ${loopStart.key}`
    : "no loop detected"
);
