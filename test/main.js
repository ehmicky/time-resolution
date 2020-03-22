import test from 'ava'

import timeResolution from '../src/main.js'

test('Returns an integer', (t) => {
  const resolution = timeResolution()

  t.true(Number.isInteger(resolution))
})
