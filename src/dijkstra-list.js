'use strict'

import test from 'node:test'
import assert from 'node:assert'

export function dijkstraList (source, sink, arr) {
  const seen = new Array(arr.length).fill(false)
  const prev = new Array(arr.length).fill(-1)
  const dists = new Array(arr.length).fill(Infinity)

  dists[source] = 0

  while (hasUnvisited(seen, dists)) {
    const curr = getLowestUnvisited(seen, dists)
    seen[curr] = true

    const adjs = arr[curr]
    for (let i = 0; i < adjs.length; i++) {
      const edge = adjs[i]
      if (seen[edge.to] === true) {
        continue
      }

      const dist = dists[curr] + edge.weight

      if (dist < dists[edge.to]) {
        dists[edge.to] = dist
        prev[edge.to] = curr
      }
    }
  }

  const out = []
  let curr = sink

  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }

  out.push(source)
  return out.reverse()
}

/**
  * @param {boolean[]} seen
  * @param {number[]} dists
  * @returns {boolean}
  */
function hasUnvisited (seen, dists) {
  return seen.some((s, i) => !s && dists[i] < Infinity)
}

/**
  * @param {boolean[]} seen
  * @param {number[]} dists
  * @returns {number}
  */
function getLowestUnvisited (seen, dists) {
  let idx = -1
  let lowestDistance = Infinity

  for (let i = 0; i < seen.length; i++) {
    if (seen[i] === true) {
      continue
    }

    if (lowestDistance > dists[i]) {
      lowestDistance = dists[i]
      idx = i
    }
  }

  return idx
}

test('dijkstra via adj list', function () {
  const list = createList()
  assert.deepEqual(dijkstraList(0, 6, list), [0, 1, 4, 5, 6])
})

function createList () {
  const list = []

  //      (1) --- (4) ---- (5)
  //    /  |       |       /|
  // (0)   | ------|------- |
  //    \  |/      |        |
  //      (2) --- (3) ---- (6)
  list[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 }
  ]
  list[1] = [
    { to: 0, weight: 3 },
    { to: 2, weight: 4 },
    { to: 4, weight: 1 }
  ]
  list[2] = [
    { to: 1, weight: 4 },
    { to: 3, weight: 7 },
    { to: 0, weight: 1 }
  ]
  list[3] = [
    { to: 2, weight: 7 },
    { to: 4, weight: 5 },
    { to: 6, weight: 1 }
  ]
  list[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 }
  ]
  list[5] = [
    { to: 6, weight: 1 },
    { to: 4, weight: 2 },
    { to: 2, weight: 18 }
  ]
  list[6] = [
    { to: 3, weight: 1 },
    { to: 5, weight: 1 }
  ]

  return list
}
