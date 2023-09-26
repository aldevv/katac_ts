package minheap

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMinHeap(t *testing.T) {
	heap := NewMinHeap(7)

	assert.Equal(t, 0, heap.Length, "Length should be 0, but is %d", heap.Length)

	heap.Insert(5)
	heap.Insert(3)
	heap.Insert(69)
	heap.Insert(420)
	heap.Insert(4)
	heap.Insert(1)
	heap.Insert(8)
	assert.Equal(t, 7, heap.Cap(), "Capacity 7, but is %d", heap.Cap())
	heap.Insert(7)
	assert.Equal(t, 14, heap.Cap(), "Capacity 14, but is %d", heap.Cap())

	assert.Equal(t, heap.Length, 8, "Length should be 8, but is %d", heap.Length)
	assert.Equal(t, heap.Delete(), 1, "Value should be 1")
	assert.Equal(t, heap.Delete(), 3, "Value should be 3")
	assert.Equal(t, heap.Delete(), 4, "Value should be 4")
	assert.Equal(t, heap.Delete(), 5, "Value should be 5")
	assert.Equal(t, heap.Length, 4, "Length should be 4, but is %d", heap.Length)
	assert.Equal(t, heap.Delete(), 7, "Value should be 7")
	assert.Equal(t, heap.Delete(), 8, "Value should be 8")
	assert.Equal(t, heap.Delete(), 69, "Value should be 69")
	assert.Equal(t, heap.Delete(), 420, "Value should be 420")
	assert.Equal(t, heap.Length, 0, "Length should be 0, but is %d", heap.Length)
}
