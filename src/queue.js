'use strict'
import test from 'node:test'
import assert from 'node:assert'

class Node {
  constructor (value) {
    this.value = value
    this.prev = null
  }
}

export class Queue {
  #length
  #head
  #tail

  constructor () {
    this.#length = 0
    this.#head = this.#tail = null
  }

  enqueue (item) {
    this.#length++
    if (this.#length === 1) {
      this.#tail = this.#head = new Node(item)
    } else {
      this.#tail.prev = new Node(item)
      this.#tail = this.#tail.prev
    }
  }

  deque () {
    if (this.#head === null) {
      this.#tail = this.#head
      return undefined
    }
    this.#length--

    const value = this.#head.value
    this.#head = this.#head.prev

    return value
  }

  peek () {
    return this.#head?.value
  }

  get length () {
    return this.#length
  }
}

test('queue', function () {
  const list = new Queue()

  list.enqueue(5)
  list.enqueue(7)
  list.enqueue(9)

  assert.equal(list.deque(), 5)
  assert.equal(list.length, 2)

  list.enqueue(11)

  assert.equal(list.deque(), 7)
  assert.equal(list.deque(), 9)
  assert.equal(list.peek(), 11)
  assert.equal(list.deque(), 11)
  assert.equal(list.deque(), undefined)
  assert.equal(list.length, 0)

  list.enqueue(69)
  assert.equal(list.peek(), 69)
  assert.equal(list.length, 1)
})
