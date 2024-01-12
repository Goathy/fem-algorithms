'use strict'

import test from 'node:test'
import assert from 'node:assert'

export default function preOrderSearch (head) {
  const path = []
  walk(head, path)
  return path
}

function walk (node, path = []) {
  if (node === null) {
    return
  }

  path.push(node.value)
  walk(node.left, path)
  walk(node.right, path)
}

test('Pre order', function () {
  const tree = createTree()
  assert.deepEqual(preOrderSearch(tree), [
    20,
    10,
    5,
    7,
    15,
    50,
    30,
    29,
    45,
    100
  ])
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
