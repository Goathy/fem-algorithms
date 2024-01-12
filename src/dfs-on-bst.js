'use strict'

import test from 'node:test'
import assert from 'node:assert'

export function dfs (head, needle) {
  if (head === null) {
    return false
  }

  if (head.value === needle) {
    return true
  }

  if (head.value < needle) {
    return dfs(head.right, needle)
  }

  return dfs(head.left, needle)
}

test('DFS on BST', function () {
  const tree = createTree()
  assert.equal(dfs(tree, 45), true)
  assert.equal(dfs(tree, 7), true)
  assert.equal(dfs(tree, 69), false)
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
