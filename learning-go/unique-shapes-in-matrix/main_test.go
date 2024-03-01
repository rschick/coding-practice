package main

import (
	"fmt"
	"testing"
)

func TestCountShapes(t *testing.T) {
	tests := []struct {
		matrix        matrix
		allowRotation bool
		expected      int
	}{
		{
			matrix: matrix{
				{0, 0, 0, 1},
				{1, 1, 0, 1},
				{0, 1, 0, 0},
				{1, 0, 0, 1},
				{1, 0, 0, 1},
			},
			allowRotation: true,
			expected:      2,
		}, {
			matrix: matrix{
				{0, 0, 0, 1},
				{1, 1, 0, 1},
				{0, 1, 0, 0},
				{1, 0, 0, 0},
				{1, 0, 1, 1},
			},
			allowRotation: true,
			expected:      2,
		}, {
			matrix: matrix{
				{0, 0, 0, 1},
				{1, 1, 0, 1},
				{0, 1, 0, 0},
				{1, 0, 0, 0},
				{1, 0, 1, 1},
			},
			allowRotation: false,
			expected:      3,
		}, {
			matrix: matrix{
				{0, 0, 0, 1, 0, 0, 0, 0, 0},
				{1, 1, 0, 1, 0, 0, 0, 0, 0},
				{0, 1, 0, 0, 0, 0, 1, 1, 0},
				{1, 0, 0, 0, 0, 0, 0, 1, 0},
				{1, 0, 1, 1, 0, 0, 1, 0, 0},
				{0, 0, 1, 1, 0, 0, 1, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 0, 0},
				{0, 0, 1, 1, 0, 0, 0, 0, 0},
				{0, 0, 1, 1, 0, 0, 0, 0, 0},
			},
			allowRotation: false,
			expected:      3,
		}, {
			matrix: matrix{
				{0, 0, 0, 1, 0, 0, 0, 0, 0},
				{1, 1, 0, 1, 0, 0, 0, 0, 0},
				{0, 1, 0, 0, 0, 1, 1, 0, 1},
				{1, 0, 0, 0, 0, 0, 0, 1, 1},
				{1, 0, 1, 1, 0, 0, 0, 0, 0},
				{0, 0, 1, 1, 0, 1, 1, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 0, 0},
				{0, 0, 1, 1, 0, 0, 0, 0, 0},
				{0, 0, 1, 1, 0, 0, 0, 0, 0},
			},
			allowRotation: true,
			expected:      3,
		},
	}

	for testIndex, testCase := range tests {
		t.Run(fmt.Sprintf("Example %d", testIndex+1), func(t *testing.T) {
			actual := countShapes(testCase.matrix, testCase.allowRotation)
			if actual != testCase.expected {
				t.Errorf("Expected %d, but got %d", testCase.expected, actual)
			}
		})
	}
}

func TestShapeNormalize(t *testing.T) {
	tests := []struct {
		shape    shape
		expected shape
	}{
		{
			shape: shape{
				points: []point{
					{0, 0},
					{-1, 0},
					{-2, 1},
					{-3, 0},
					{-3, 1},
				},
			},
			expected: shape{
				points: []point{
					{0, 0},
					{0, 1},
					{1, 1},
					{2, 0},
					{3, 0},
				},
			},
		},
	}

	for testIndex, testCase := range tests {
		t.Run(fmt.Sprintf("Example %d", testIndex+1), func(t *testing.T) {
			result := testCase.shape.Normalize()
			if result.String() != testCase.expected.String() {
				t.Errorf("Expected %v, but got %v", testCase.expected, result)
			}
		})
	}
}
