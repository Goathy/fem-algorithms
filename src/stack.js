'use strict'

import test from 'node:test'
import assert from 'node:assert'

class Node {
  constructor (value) {
    this.value = value
    this.next = null
  }
}

export class Stack {
  #length
  #head

  constructor () {
    this.#length = 0
    this.#head = null
  }

  push (item) {
    this.#length++
    if (this.#length === 1) {
      this.#head = new Node(item)
    } else {
      const node = new Node(item)
      node.next = this.#head
      this.#head = node
    }
  }

  pop () {
    if (this.#head === null) {
      return undefined
    }

    this.#length--

    const value = this.#head.value
    this.#head = this.#head.next

    return value
  }

  peek () {
    return this.#head?.value
  }

  get length () {
    return this.#length
  }
}

test('stack', function () {
  const list = new Stack()

  list.push(5)
  list.push(7)
  list.push(9)

  assert.equal(list.pop(), 9)
  assert.equal(list.length, 2)

  list.push(11)
  assert.equal(list.pop(), 11)
  assert.equal(list.pop(), 7)
  assert.equal(list.peek(), 5)
  assert.equal(list.pop(), 5)
  assert.equal(list.pop(), undefined)

  // just wanted to make sure that I could not blow up myself when i remove
  // everything
  list.push(69)
  assert.equal(list.peek(), 69)
  assert.equal(list.length, 1)

  // yayaya
})
