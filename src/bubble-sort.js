'use strict'

import test from 'node:test'
import assert from 'node:assert'

export function bubbleSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
  }
}

test('bubble-sort', function () {
  const arr = [9, 3, 7, 4, 69, 420, 42]

  bubbleSort(arr)
  assert.deepEqual(arr, [3, 4, 7, 9, 42, 69, 420])
})
