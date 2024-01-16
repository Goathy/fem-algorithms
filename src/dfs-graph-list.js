'use strict'

import test from 'node:test'
import assert from 'node:assert'

export function dfs (graph, source, needle) {
  const seen = new Set()
  const path = []

  walk(graph, source, needle, seen, path)

  if (path.length) {
    return path
  }

  return null
}

function walk (graph, curr, needle, seen, path) {
  if (seen.has(curr)) {
    return false
  }

  seen.add(curr)

  // recurse
  // pre
  path.push(curr)

  if (curr === needle) {
    return true
  }

  // recurse
  const list = graph[curr]
  for (let i = 0; i < list.length; i++) {
    const edge = list[i]
    if (walk(graph, edge.to, needle, seen, path) === true) {
      return true
    }
  }

  // post
  path.pop()

  return false
}

test('bfs - graph', function () {
  const list = createList()
  assert.deepEqual(dfs(list, 0, 6), [
    0,
    1,
    4,
    5,
    6
  ])

  assert.equal(dfs(list, 6, 0), null)
})

function createList () {
  const list = []

  //     >(1)<--->(4) ---->(5)
  //    /          |       /|
  // (0)     ------|------- |
  //    \   v      v        v
  //     >(2) --> (3) <----(6)
  list[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 }
  ]
  list[1] = [
    { to: 4, weight: 1 }
  ]
  list[2] = [
    { to: 3, weight: 7 }
  ]
  list[3] = []
  list[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 }
  ]
  list[5] = [
    { to: 2, weight: 18 },
    { to: 6, weight: 1 }
  ]
  list[6] = [
    { to: 3, weight: 1 }
  ]

  return list
}
