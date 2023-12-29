'use strict'

import test from 'node:test'
import assert from 'node:assert'

export function linearSearch (haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return true
    }
  }
  return false
}

test('linear search array', function () {
  const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420]
  assert.equal(linearSearch(foo, 69), true)
  assert.equal(linearSearch(foo, 1336), false)
  assert.equal(linearSearch(foo, 69420), true)
  assert.equal(linearSearch(foo, 69421), false)
  assert.equal(linearSearch(foo, 1), true)
  assert.equal(linearSearch(foo, 0), false)
})
