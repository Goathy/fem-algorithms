'use strict'

import test from 'node:test'
import assert from 'node:assert'

class Node {
  constructor (value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

export default class DoublyLinkedList {
  #length
  #head
  #tail

  constructor () {
    this.#length = 0
    this.#head = null
    this.#tail = null
  }

  debug () {
    let curr = this.#head
    let out = ''
    for (let i = 0; curr !== null && i < this.#length; i++) {
      out += `${i} => ${curr.value} `
      curr = curr.next
    }
    console.log(out)
  }

  prepend (item) {
    const node = new Node(item)

    this.#length++
    if (this.#head === null) {
      this.#head = this.#tail = node
      return
    }
    node.next = this.#head
    this.#head.prev = node
    this.#head = node
  }

  insertAt (item, idx) {
    if (idx > this.#length) {
      throw new Error('oh no')
    }

    if (idx === this.#length) {
      this.append(item)
      return
    }

    if (idx === 0) {
      this.prepend(item)
      return
    }

    this.#length++
    const curr = this.#getAt(idx)

    const node = new Node(item)

    node.next = curr
    node.prev = curr.prev
    curr.prev = node

    if (node.prev !== null) {
      node.prev.next = curr
    }
  }

  append (item) {
    this.#length++

    const node = new Node(item)

    if (this.#tail === null) {
      this.#head = this.#tail = node

      return
    }

    node.prev = this.#tail
    this.#tail.next = node
    this.#tail = node
  }

  remove (item) {
    let curr = this.#head

    for (let i = 0; curr !== null && curr.value !== item && i < this.#length; i++) {
      curr = curr.next
    }

    if (curr === null) {
      return undefined
    }

    return this.#removeNode(curr)
  }

  get (idx) {
    return this.#getAt(idx)?.value
  }

  removeAt (idx) {
    const node = this.#getAt(idx)

    if (node === null) {
      return undefined
    }

    return this.#removeNode(node)
  }

  get length () {
    return this.#length
  }

  #removeNode (node) {
    this.#length--

    if (this.#length === 0) {
      const out = this.#head?.value
      this.#head = this.#tail = null
      return out
    }

    if (node.prev !== null) {
      node.prev.next = node.next
    }

    if (node.next !== null) {
      node.next.prev = node.prev
    }

    if (node.value === this.#head.value) {
      this.#head = node.next
    }

    if (node.value === this.#tail.value) {
      this.#tail = node.prev
    }

    node.prev = node.next = null

    return node.value
  }

  #getAt (idx) {
    let curr = this.#head
    for (let i = 0; curr !== null && i < idx; i++) {
      curr = curr.next
    }

    return curr
  }
}

test('DoublyLinkedList', function () {
  const list = new DoublyLinkedList()
  list.append(5)
  list.append(7)
  list.append(9)

  assert.equal(list.get(2), 9)
  assert.equal(list.removeAt(1), 7)
  assert.equal(list.length, 2)

  list.append(11)
  assert.equal(list.removeAt(1), 9)
  assert.equal(list.remove(9), undefined)
  assert.equal(list.removeAt(0), 5)
  assert.equal(list.removeAt(0), 11)
  assert.equal(list.length, 0)

  list.prepend(5)
  list.prepend(7)
  list.prepend(9)

  assert.equal(list.get(2), 5)
  assert.equal(list.get(0), 9)
  assert.equal(list.remove(9), 9)
  assert.equal(list.length, 2)
  assert.equal(list.get(0), 7)
})
