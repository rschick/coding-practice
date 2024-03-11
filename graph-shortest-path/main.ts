interface KeyedItem {
  key: string;
}

type VisitFunction<T extends KeyedItem> = (vertex: T) => void;

class DirectedGraph<ItemType extends KeyedItem> {
  vertices: Map<string, ItemType> = new Map();
  adjacencies: Map<string, Set<string>> = new Map();

  insert(from: ItemType, to: ItemType) {
    this.vertices.set(from.key, from);
    this.vertices.set(to.key, to);

    let fromAdj = this.adjacencies.get(from.key);
    if (!fromAdj) {
      fromAdj = new Set();
      this.adjacencies.set(from.key, fromAdj);
    }
    fromAdj.add(to.key);
  }

  bfs(startKey: string, visit: VisitFunction<ItemType>) {
    const visited = new Map<string, boolean>();
    const queue = [startKey];
    visited.set(startKey, true);

    for (;;) {
      const key = queue.pop();
      if (!key) {
        break;
      }

      const vertex = this.vertices.get(key);
      if (vertex) {
        visit(vertex);
      }

      for (const adjacentKey of this.adjacencies.get(key)?.values() || []) {
        if (!visited.get(adjacentKey)) {
          queue.unshift(adjacentKey);
          visited.set(adjacentKey, true);
        }
      }
    }
  }

  dfs(startKey: string, visit: VisitFunction<ItemType>) {
    const visited = new Set<string>();
    const stack = [startKey];
    visited.add(startKey);

    for (;;) {
      const key = stack.pop();
      if (!key) {
        break;
      }

      for (const adjacentKey of this.adjacencies.get(key)?.values() || []) {
        if (!visited.has(adjacentKey)) {
          stack.push(adjacentKey);
          visited.add(adjacentKey);
        }
      }

      const vertex = this.vertices.get(key);
      if (vertex) {
        visit(vertex);
      }
    }
  }
}

interface MyItem {
  key: string;
}

const graph = new DirectedGraph<MyItem>();

graph.insert({ key: "C" }, { key: "D" });
graph.insert({ key: "D" }, { key: "E" });
graph.insert({ key: "B" }, { key: "E" });
graph.insert({ key: "A" }, { key: "B" });
graph.insert({ key: "B" }, { key: "C" });
graph.insert({ key: "C" }, { key: "A" });
graph.insert({ key: "D" }, { key: "D" });

// graph.dfs("A", (item) => console.log(item.key));

let found = false;
graph.dfs("A", (item) => {
  if (item.key === "E") {
    found = true;
  }
});
console.log(found ? "Found a path" : "No path");
