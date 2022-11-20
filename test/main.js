import test from 'ava'
import timeResolution from 'time-resolution'

const MIN_RESOLUTION = 1
const TEST_RESOLUTION = 50
const MAX_TIMES = 1e2
const BIG_SIZE = 1e6

test('Use the current resolution by default', (t) => {
  t.true(Number.isInteger(timeResolution()))
})

test('Use a default resolution on empty arrays', (t) => {
  t.is(timeResolution([]), MIN_RESOLUTION)
})

test('Can pass an array of times', (t) => {
  t.is(timeResolution([TEST_RESOLUTION, TEST_RESOLUTION * 3]), TEST_RESOLUTION)
})

test('Can pass a single time', (t) => {
  t.is(timeResolution([TEST_RESOLUTION]), TEST_RESOLUTION)
})

test('Can pass a single minimum resolution', (t) => {
  t.is(timeResolution([MIN_RESOLUTION]), MIN_RESOLUTION)
})

test('Can pass a big array of times', (t) => {
  t.is(
    timeResolution(new Array(BIG_SIZE).fill(TEST_RESOLUTION)),
    TEST_RESOLUTION,
  )
})

test('Returns the minimum resolution if all times are 0', (t) => {
  t.is(timeResolution([0, 0, 0]), MIN_RESOLUTION)
})

test('Ignore times that are 0', (t) => {
  t.is(timeResolution([0, TEST_RESOLUTION]), TEST_RESOLUTION)
})

test('Stops after checking a specific amount of times', (t) => {
  t.is(
    timeResolution([
      MIN_RESOLUTION,
      ...new Array(MAX_TIMES).fill(TEST_RESOLUTION),
    ]),
    TEST_RESOLUTION,
  )
})

test('Search in reverse order', (t) => {
  t.is(
    timeResolution([
      ...new Array(MAX_TIMES).fill(TEST_RESOLUTION),
      MIN_RESOLUTION,
    ]),
    MIN_RESOLUTION,
  )
})

test('Ignore 0 when checking a specific amount of times', (t) => {
  t.is(
    timeResolution([MIN_RESOLUTION, ...new Array(MAX_TIMES).fill(0)]),
    MIN_RESOLUTION,
  )
})
