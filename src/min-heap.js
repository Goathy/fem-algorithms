'use strict'

import test from 'node:test'
import assert from 'node:assert'

export class MinHeap {
  #length
  #data

  constructor () {
    this.#length = 0
    this.#data = []
  }

  insert (value) {
    this.#data[this.#length] = value
    this.#heapifyUp(this.#length)
    this.#length++
  }

  delete () {
    if (this.#length === 0) {
      return
    }

    const out = this.#data[0]
    this.#length--

    if (this.#length === 0) {
      this.#data = []
      return out
    }

    this.#data[0] = this.#data[this.#length]
    this.#heapifyDown(0)
    return out
  }

  get length () {
    return this.#length
  }

  #parent (idx) {
    return Math.floor((idx - 1) / 2)
  }

  #left (idx) {
    return (2 * idx) + 1
  }

  #right (idx) {
    return (2 * idx) + 2
  }

  #heapifyUp (idx) {
    if (idx === 0) {
      return
    }

    const parentIdx = this.#parent(idx)
    const parentValue = this.#data[parentIdx]
    const value = this.#data[idx]

    if (parentValue > value) {
      this.#data[idx] = parentValue
      this.#data[parentIdx] = value
      this.#heapifyUp(parentIdx)
    }
  }

  #heapifyDown (idx) {
    if (idx >= this.#length) {
      return
    }

    const leftIdx = this.#left(idx)
    const rightIdx = this.#right(idx)

    if (leftIdx >= this.#length) {
      return
    }

    const leftValue = this.#data[leftIdx]
    const rightValue = this.#data[rightIdx]
    const value = this.#data[idx]

    if (leftValue > rightValue && value > rightValue) {
      this.#data[idx] = rightValue
      this.#data[rightIdx] = value
      this.#heapifyDown(rightIdx)
    } else if (rightValue > leftValue && value > leftValue) {
      this.#data[idx] = leftValue
      this.#data[leftIdx] = value
      this.#heapifyDown(leftIdx)
    }
  }
}

test('min heap', function () {
  const heap = new MinHeap()

  assert.equal(heap.length, 0)

  heap.insert(5)
  heap.insert(3)
  heap.insert(69)
  heap.insert(420)
  heap.insert(4)
  heap.insert(1)
  heap.insert(8)
  heap.insert(7)

  assert.equal(heap.length, 8)
  assert.equal(heap.delete(), 1)
  assert.equal(heap.delete(), 3)
  assert.equal(heap.delete(), 4)
  assert.equal(heap.delete(), 5)
  assert.equal(heap.length, 4)
  assert.equal(heap.delete(), 7)
  assert.equal(heap.delete(), 8)
  assert.equal(heap.delete(), 69)
  assert.equal(heap.delete(), 420)
  assert.equal(heap.length, 0)
})
