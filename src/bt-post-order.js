'use strict'

import test from 'node:test'
import assert from 'node:assert'

export default function postOrderSearch (head) {
  const path = []
  walk(head, path)
  return path
}

function walk (node, path = []) {
  if (node === null) {
    return
  }

  walk(node.left, path)
  walk(node.right, path)
  path.push(node.value)
}

test('Post order', function () {
  const tree = createTree()
  assert.deepEqual(postOrderSearch(tree), [
    7,
    5,
    15,
    10,
    29,
    45,
    30,
    100,
    50,
    20
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
