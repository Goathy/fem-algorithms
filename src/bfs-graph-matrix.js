'use strict'

import test from 'node:test'
import assert from 'node:assert'
import { Queue } from './queue.js'

export function bfs (graph, source, needle) {
  const seen = new Set()
  const prev = new Array(graph.length).fill(-1)
  const q = new Queue()

  q.enqueue(source)
  seen.add(source)

  do {
    const curr = q.deque()
    if (curr === needle) {
      break
    }

    const adjs = graph[curr]
    for (let i = 0; i < adjs.length; i++) {
      if (adjs[i] === 0) {
        continue
      }

      if (seen.has(i)) {
        continue
      }

      seen.add(i)
      prev[i] = curr
      q.enqueue(i)
    }
  } while (q.length)

  let curr = needle
  const out = []

  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }

  if (out.length > 0) {
    return [source].concat(out.reverse())
  }

  return null
}

test('bfs - graph matrix', function () {
  const matrix = createMatrix()
  assert.deepEqual(bfs(matrix, 0, 6), [
    0,
    1,
    4,
    5,
    6
  ])

  assert.equal(bfs(matrix, 6, 0), null)
})

function createMatrix () {
  //     >(1)<--->(4) ---->(5)
  //    /          |       /|
  // (0)     ------|------- |
  //    \   v      v        v
  return [
    [0, 3, 1, 0, 0, 0, 0], // 0
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 5, 0, 2, 0],
    [0, 0, 18, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1]
  ]
}
