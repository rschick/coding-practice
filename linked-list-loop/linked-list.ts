interface ListItem {
  key: string;
}

class ListNode<ItemType> {
  item: ItemType;
  next?: ListNode<ItemType>;

  constructor(item: ItemType) {
    this.item = item;
  }
}

type VisitFunction = (item: ListItem) => void;

export class LinkedList<ItemType extends ListItem> {
  head?: ListNode<ItemType>;
  tail?: ListNode<ItemType>;

  insertTail(item: ItemType) {
    const newNode = new ListNode(item);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (!this.tail) {
        throw new Error("tail is undefined");
      }
      this.tail = this.tail.next = newNode;
    }
  }

  traverse(visit: VisitFunction) {
    for (
      let currentNode = this.head;
      currentNode;
      currentNode = currentNode.next
    ) {
      visit(currentNode.item);
    }
  }

  *[Symbol.iterator]() {
    for (
      let currentNode = this.head;
      currentNode;
      currentNode = currentNode.next
    ) {
      yield currentNode.item;
    }
  }

  find(keys: string[]) {
    const map = new Map<string, ListNode<ItemType>>();

    for (let node = this.head; node; node = node.next) {
      if (keys.includes(node.item.key)) {
        map.set(node.item.key, node);
      }
    }

    return map;
  }

  addLink(fromKey: string, toKey: string) {
    const map = this.find([fromKey, toKey]);
    const fromNode = map.get(fromKey);
    if (!fromNode) {
      throw new Error(`node ${fromKey} not found`);
    }
    fromNode.next = map.get(toKey);
  }

  detectLoop() {
    if (!this.head || !this.head.next) {
      return;
    }

    let slow: ListNode<ItemType> | undefined = this.head;
    let fast = slow.next;

    for (; slow && fast; slow = slow.next, fast = fast.next?.next) {
      if (fast === slow) {
        // found a loop, move slow to the head, and fast to the first
        // node after the collision, then single-step each until they collide,
        // which is where the loop starts
        for (slow = this.head, fast = fast.next; slow !== fast; ) {
          slow = slow!.next;
          fast = fast!.next;
        }

        if (!slow) {
          throw new Error("slow is unexpectedly undefined");
        }

        return slow.item;
      }
    }
  }

  static build<ItemType extends ListItem>(items: ItemType[]) {
    const list = new LinkedList<ItemType>();

    for (const item of items) {
      list.insertTail(item);
    }

    return list;
  }
}
