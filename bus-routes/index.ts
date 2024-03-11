/**
 * You are given an array of routes representing bus
 * routes where routes[i] is the route that the ith bus
 * repeats forever.
 *
 * For example, if routes[0] = [1, 5, 7], this means that
 * the 0th bus travels in the sequence 1 -> 5 -> 7 -> 1
 * -> 5 -> 7 -> 1 -> ... forever.
 *
 * You will start at the bus stop source (You are not on
 * any bus initially), and you want to go to the bus stop
 * target. You can travel between bus stops by buses only.
 *
 * Return the least number of buses you must take to travel
 * from source to target. Return -1 if it is not possible.
 */

// Example 1:
// Input: routes = [[1, 2, 7], [3, 6, 7]], source = 1, target = 6
// Output: 2
// Explanation: The best way to go from 1 to 6 is: 1 -> 2 -> 7 -> 6

// Example 2:
// Input: routes = [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], source = 15, target = 12
// Output: -1
// Explanation: There is no way to go from 15 to 12.

// Notes:
// * routes[0] contains the route for the 0th bus
// * a route is a list of bus stops
// * assume each route has at least two bus stops
// * assume each route has less than 100 bus stops
// * this definitely feels like a graph problem
// * if we construct a graph with the bus stops as vertices
//   and the routes as edges, we can use a shortest path
//   algorithm to find the minimum number of edges between
//   the source and the target (or -1 if there is no path).
// * we could augment the edges to include the bus number
//   that travels between the stops.
// * we can use breadth-first search to find the shortest
//   path, and accumulate the number of buses we take by
//   keeping track of the last bus we took and only increment
//   the count when we switch buses.
//

// Approach:
// * construct a (directed) graph with the bus stops as vertices
//   and the
//   routes as edges, and augment the edges to include the bus
//   number that travels between the stops
// * use breadth-first search to find the shortest path from
//   the source to the target
// * keep track of the number of buses we take by keeping track
//   of the last bus we took and only increment the count when
//   we switch buses
// * return -1 if there is no path (we have searched the entire
//   graph and have not found the target)

// Time complexity:
// * given number of vertices V and number of edges E, the time
//   complexity of breadth-first search is O(V + E)
// * the time complexity of constructing the graph is O(V + E)

// Space complexity:
// * the space complexity of the graph is O(V + E)
// * the space complexity of the queue is O(V)
// * the space complexity of the visited set is O(V)

interface Edge {
  to: number;
  bus: number;
}

interface Vertex {
  key: number;
  parent?: number;
}

type Path = Edge[];

class DirectedGraph {
  private adjacencies = new Map<number, Set<Edge>>();

  insert(from: number, to: number, bus: number) {
    if (!this.adjacencies.has(from)) {
      this.adjacencies.set(from, new Set());
    }

    this.adjacencies.get(from)?.add({ to, bus });
  }

  bfs(startStop: number, targetStop: number): Map<number, Vertex> | undefined {
    const tree = new Map<number, Vertex>();
    const visited = new Set<number>();
    const queue = [startStop];

    while (queue.length) {
      const currentStop = queue.shift();

      if (!currentStop) {
        break;
      }

      if (currentStop === targetStop) {
        return tree;
      }

      for (const { to: adjacentStop } of this.adjacencies
        .get(currentStop)
        ?.values() || []) {
        if (!visited.has(adjacentStop)) {
          queue.push(adjacentStop);
          visited.add(adjacentStop);

          tree.set(adjacentStop, {
            key: adjacentStop,
            parent: currentStop,
          });
        }
      }
    }

    return;
  }
}

function numBusesToDestination(
  routes: number[][],
  source: number,
  target: number
) {
  const graph = new DirectedGraph();

  for (let busNumber = 0; busNumber < routes.length; busNumber++) {
    const numStops = routes[busNumber].length;

    for (let stopNumber = 0; stopNumber < numStops; stopNumber++) {
      if (stopNumber < numStops - 1) {
        // Add edge from current stop to next stop
        graph.insert(
          routes[busNumber][stopNumber],
          routes[busNumber][stopNumber + 1],
          busNumber
        );
      } else {
        // Add edge from last to first stop
        graph.insert(
          routes[busNumber][numStops - 1],
          routes[busNumber][0],
          busNumber
        );
      }
    }
  }

  const tree = graph.bfs(source, target);

  if (!tree) {
    return -1;
  }

  console.log(tree);

  const buses = new Set<number>();

  for (
    let stop = tree.get(target);
    stop?.parent;
    stop = tree.get(stop.parent)
  ) {
    buses.add(stop);
  }

  return buses.size;
}

console.log(
  numBusesToDestination(
    [
      [1, 2, 7],
      [3, 6, 7],
    ],
    1,
    6
  )
); // 2

// console.log(
//   numBusesToDestination(
//     [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]],
//     15,
//     12
//   )
// ); // -1
