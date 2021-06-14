/* eslint-disable no-magic-numbers */
import test from 'ava'
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import timeResolution from 'time-resolution'

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

test('Returns the minimum resolution if all times are 0', (t) => {
  const resolution = timeResolution([0, 0, 0])
  t.is(resolution, 1)
})

test('Ignore times that are 0', (t) => {
  const resolution = timeResolution([0, 50])
  t.is(resolution, 50)
})

test('Stops after checking a specific amount of times', (t) => {
  const times = Array.from({ length: 1e2 }, () => 50)
  const resolution = timeResolution([1, ...times])
  t.is(resolution, 50)
})

test('Search in reverse order', (t) => {
  const times = Array.from({ length: 1e2 }, () => 50)
  const resolution = timeResolution([...times, 1])
  t.is(resolution, 1)
})

test('Ignore 0 when checking a specific amount of times', (t) => {
  const times = Array.from({ length: 1e2 }, () => 0)
  const resolution = timeResolution([1, ...times])
  t.is(resolution, 1)
})
/* eslint-enable no-magic-numbers */
