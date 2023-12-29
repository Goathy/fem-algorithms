'use strict'

import test from 'node:test'
import assert from 'node:assert'

// Linear search with extra steps :)
export function twoCrystallBalls (breaks) {
  const step = Math.floor(Math.sqrt(breaks.length))

  let i = step
  for (; i < breaks.length; i += step) {
    if (breaks[i]) {
      break
    }
  }

  i -= step

  for (let j = 0; j < step && i < breaks.length; j++, i++) {
    if (breaks[i]) {
      return i
    }
  }
  return -1
}

test('two crystal balls', function () {
  const idx = Math.floor(Math.random() * 10000)
  const data = new Array(10000).fill(false)

  for (let i = idx; i < 10000; ++i) {
    data[i] = true
  }

  assert.equal(twoCrystallBalls(data), idx)
  assert.equal(twoCrystallBalls(new Array(821).fill(false)), -1)
})
