// Find unique shapes in the input matrix

// Example:

// 0 0 0 1
// 1 1 0 1
// 0 1 0 0
// 1 0 0 1
// 1 0 0 1

// Should return 2

package main

import "fmt"

type matrix [][]int

type point [2]int

func (p1 point) subtract(p2 point) point {
	return point{p1[0] - p2[0], p1[1] - p2[1]}
}

type shape struct {
	points []point
}

func (s shape) String() string {
	var str string
	var first = s.points[0]
	for _, p := range s.points {
		str += fmt.Sprintf("%v ", p.subtract(first))
	}
	return str
}

func (s shape) Rotate90() shape {
	var rotated = shape{}
	var first = s.points[0]
	for _, p := range s.points {
		rotated.points = append(rotated.points, point{p[1] - first[1], -p[0] + first[0]})
	}
	return rotated
}

func (m matrix) Rotate90() matrix {
	var n = len(m)
	var rotated = make(matrix, n)
	for i := range rotated {
		rotated[i] = make([]int, n)
	}

	for row := range m {
		for col := range m[row] {
			rotated[col][n-1-row] = m[row][col]
		}
	}

	return rotated
}

func (m matrix) String() string {
	var str string
	for _, row := range m {
		str += fmt.Sprintf("%v\n", row)
	}
	return str
}

func countShapes(input matrix, allowRotation bool) int {
	var visited = make(map[point]bool)
	var m = len(input)
	var n = len(input[0])

	buildShape := func(row, col int) shape {
		shape := shape{}

		var visit func(row, col int)

		visit = func(row, col int) {
			if row < 0 || row >= m || col < 0 || col >= n || input[row][col] == 0 || visited[point{row, col}] {
				return
			}

			// add the current point to the shape
			shape.points = append(shape.points, point{row, col})

			// mark point as visited
			visited[point{row, col}] = true

			// visit the neighbors
			visit(row-1, col-1)
			visit(row-1, col)
			visit(row-1, col+1)
			visit(row, col-1)
			visit(row, col+1)
			visit(row+1, col-1)
			visit(row+1, col)
			visit(row+1, col+1)
		}

		visit(row, col)

		return shape
	}

	var shapesIndex = make(map[string]bool)
	var uniqueShapes int

	for row := range input {
		for col := range input[row] {
			if input[row][col] == 1 && !visited[point{row, col}] {
				shape := buildShape(row, col)

				if !shapesIndex[shape.String()] {
					// add original shape to the shapes index
					shapesIndex[shape.String()] = true

					if allowRotation {
						// add rotations to the shapes index
						shapesIndex[shape.Rotate90().String()] = true
						shapesIndex[shape.Rotate90().Rotate90().String()] = true
						shapesIndex[shape.Rotate90().Rotate90().Rotate90().String()] = true
					}

					uniqueShapes++
				}
			}
		}
	}

	return uniqueShapes
}

func main() {
	for _, allowRotation := range []bool{true, false} {
		fmt.Println(countShapes(matrix{
			{0, 0, 0, 1},
			{1, 1, 0, 1},
			{0, 1, 0, 0},
			{1, 0, 0, 1},
			{1, 0, 0, 1},
		}, allowRotation))

		fmt.Println(countShapes(matrix{
			{0, 0, 0, 1},
			{1, 1, 0, 1},
			{0, 1, 0, 0},
			{1, 0, 0, 0},
			{1, 0, 1, 1},
		}, allowRotation))

		fmt.Println(countShapes(matrix{
			{0, 0, 0, 1},
			{1, 1, 0, 1},
			{0, 1, 0, 0},
			{1, 0, 0, 1},
			{1, 0, 1, 1},
		}, allowRotation))
	}
}
