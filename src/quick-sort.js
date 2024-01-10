'use strict'

import test from 'node:test'
import assert from 'node:assert'

/**
  * Sorts an array of numbers using the quick sort algorithm.
  *
  * @param {number[]} arr - The array to sort.
  * @returns {void}
  */
export default function quickSort (arr) {
  qs(arr, 0, arr.length - 1)
}

/**
  * @param {number[]} arr
  * @param {number} low
  * @param {number} high
  * @returns {void}
  */
function qs (arr, low, high) {
  if (low >= high) {
    return
  }

  const pivotIdx = partition(arr, low, high)

  qs(arr, low, pivotIdx - 1)
  qs(arr, pivotIdx + 1, high)
}

/**
  * @param {number[]} arr
  * @param {number} low
  * @param {number} high
  * @returns {number} pivot index
  */
function partition (arr, low, high) {
  const pivot = arr[high]
  let idx = low - 1

  for (let i = low; i < high; i++) {
    if (arr[i] <= pivot) {
      idx++
      const tmp = arr[i]
      arr[i] = arr[idx]
      arr[idx] = tmp
    }
  }

  idx++
  arr[high] = arr[idx]
  arr[idx] = pivot

  return idx
}

test('quick-sort', function () {
  const arr = [9, 3, 7, 4, 69, 420, 42]

  quickSort(arr)
  assert.deepEqual(arr, [3, 4, 7, 9, 42, 69, 420])
})
