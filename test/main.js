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

test('Use a default resolution on arrays with a single time', (t) => {
  const resolution = timeResolution([50])

  t.is(resolution, 1)
})

test('Use a default resolution on arrays with a single unique time', (t) => {
  const resolution = timeResolution([50, 50])

  t.is(resolution, 1)
})

test('Can pass an array of times', (t) => {
  const resolution = timeResolution([50, 150])

  t.is(resolution, 50)
})
/* eslint-enable no-magic-numbers */
