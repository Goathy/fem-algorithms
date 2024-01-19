'use strict'

import test from 'node:test'
import assert from 'node:assert'

export class LRU {
  #length
  #head
  #tail

  #lookup
  #reverseLookup
  #capacity

  constructor (capacity) {
    this.#length = 0
    this.#head = this.#tail = null
    this.#lookup = new Map()
    this.#reverseLookup = new Map()
    this.#capacity = capacity
  }

  update (key, value) {
    const node = this.#lookup.get(key)
    if (node === undefined) {
      const node = new Node(value)
      this.#length++
      this.#prepend(node)
      this.#trimCache()

      this.#lookup.set(key, node)
      this.#reverseLookup.set(node, key)
    } else {
      this.#detach(node)
      this.#prepend(node)
      node.value = value
    }
  }

  get (key) {
    const node = this.#lookup.get(key)
    if (node === undefined) {
      return undefined
    }

    this.#detach(node)
    this.#prepend(node)

    return node.value
  }

  #detach (node) {
    if (node.prev !== null) {
      node.prev.next = node.next
    }

    if (node.next !== null) {
      node.next.prev = node.prev
    }

    if (this.#length === 1) {
      this.#head = this.#tail = null
    }

    if (this.#head === node) {
      this.#head = this.#head.next
    }

    if (this.#tail === node) {
      this.#tail = this.#tail.prev
    }

    node.prev = node.next = null
  }

  #prepend (node) {
    if (this.#head === null) {
      this.#head = this.#tail = node
    } else {
      node.next = this.#head
      this.#head.prev = node
      this.#head = node
    }
  }

  #trimCache () {
    if (this.#length <= this.#capacity) {
      return
    }

    const tail = this.#tail
    this.#detach(tail)

    const key = this.#reverseLookup.get(tail)
    this.#lookup.delete(key)
    this.#reverseLookup.delete(tail)
    this.#length--
  }
}

class Node {
  constructor (value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

test('LRU', function () {
  const lru = new LRU(3)

  assert.equal(lru.get('foo'), undefined)
  lru.update('foo', 69)
  assert.equal(lru.get('foo'), 69)

  lru.update('bar', 420)
  assert.equal(lru.get('bar'), 420)

  lru.update('baz', 1337)
  assert.equal(lru.get('baz'), 1337)

  lru.update('ball', 69420)
  assert.equal(lru.get('ball'), 69420)
  assert.equal(lru.get('foo'), undefined)
  assert.equal(lru.get('bar'), 420)
  lru.update('foo', 69)
  assert.equal(lru.get('bar'), 420)
  assert.equal(lru.get('foo'), 69)

  // shouldn't of been deleted, but since bar was get'd, bar was added to the
  // front of the list, so baz became the end
  assert.equal(lru.get('baz'), undefined)
})
