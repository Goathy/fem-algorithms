'use strict'

import test from 'node:test'
import assert from 'node:assert'

export function compare (a, b) {
  if (a === null && b === null) {
    return true
  }

  if (a === null || b === null) {
    return false
  }

  if (a.value !== b.value) {
    return false
  }

  return compare(a.left, b.left) && compare(a.right, b.right)
}

test('Compare Binary Trees', function () {
  const { tree, tree2 } = createTrees()
  assert.equal(compare(tree, tree), true)
  assert.equal(compare(tree, tree2), false)
})

function createTrees () {
  const tree = {
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
  const tree2 = {
    value: 20,
    right: {
      value: 50,
      right: null,
      left: {
        value: 30,
        right: {
          value: 45,
          right: {
            value: 49,
            left: null,
            right: null
          },
          left: null
        },
        left: {
          value: 29,
          right: null,
          left: {
            value: 21,
            right: null,
            left: null
          }
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

  return { tree, tree2 }
}
