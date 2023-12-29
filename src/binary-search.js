'use strict'

import test from 'node:test'
import assert from 'node:assert'

export function binarySearch (haystack, needle) {
  let low = 0
  let mid
  let high = haystack.length

  do {
    mid = Math.floor(low + ((high - low) / 2))

    if (haystack[mid] === needle) {
      return true
    }

    if (haystack[mid] > needle) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  } while (low < high)

  return false
}

test('binary search array', function () {
  const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420]
  assert.equal(binarySearch(foo, 69), true)
  assert.equal(binarySearch(foo, 1336), false)
  assert.equal(binarySearch(foo, 69420), true)
  assert.equal(binarySearch(foo, 69421), false)
  assert.equal(binarySearch(foo, 1), true)
  assert.equal(binarySearch(foo, 0), false)
})
