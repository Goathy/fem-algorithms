'use strict'

import test from 'node:test'
import assert from 'node:assert'
import { Queue } from './queue.js'

function bfs (head, needle) {
  const queue = new Queue()
  queue.enqueue(head)

  let next

  while (queue.length) {
    next = queue.deque()

    if (next === null) {
      continue
    }

    if (next.value === needle) {
      return true
    }

    queue.enqueue(next.left)
    queue.enqueue(next.right)
  }

  return false
}

test('bt bfs', function () {
  const tree = createTree()
  assert.equal(bfs(tree, 45), true)
  assert.equal(bfs(tree, 7), true)
  assert.equal(bfs(tree, 69), false)
})

function createTree () {
  return {
    value: 20,
    right: {
      value: 50,
      right: {
        value: 100,
        right: null,
        left: null
      },
      left: {
        value: 30,
        right: {
          value: 45,
          right: null,
          left: null
        },
        left: {
          value: 29,
          right: null,
          left: null
        }
      }
    },
    left: {
      value: 10,
      right: {
        value: 15,
        right: null,
        left: null
      },
      left: {
        value: 5,
        right: {
          value: 7,
          right: null,
          left: null
        },
        left: null
      }
    }
  }
}
