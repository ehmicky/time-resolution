/* eslint-disable no-magic-numbers */
import test from 'ava'

import timeResolution from '../src/main.js'

test('Use the current resolution by default', (t) => {
  const resolution = timeResolution()

  t.true(Number.isInteger(resolution))
})

test('Use a default resolution on empty arrays', (t) => {
  const resolution = timeResolution([])

  t.is(resolution, 1)
})

test('Default to the minimum resolution', (t) => {
  const resolution = timeResolution([1])

  t.is(resolution, 1)
})

test('Can pass an array of times', (t) => {
  const resolution = timeResolution([50, 150])

  t.is(resolution, 50)
})

test('Can pass a single time', (t) => {
  const resolution = timeResolution([50])

  t.is(resolution, 50)
})

test('Can pass a big array of times', (t) => {
  const times = Array.from({ length: 1e6 }, () => 50)
  const resolution = timeResolution(times)

  t.is(resolution, 50)
})

/* eslint-enable no-magic-numbers */
