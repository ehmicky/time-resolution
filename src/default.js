import now from 'precise-now'

// Run `now()` several times in a row.
// We do it several times because there is a chance that the next resolution
// would be hit otherwise. For example:
//  - if resolution is 1ns, samples might (by chance) all be modulo 5ns
//  - if resolution is 5ns, samples might (by chance) all be modulo 10ns
// The probability for this to happen is:
//  - if resolution is *1ns, `1 / 5 ** length`
//  - if resolution is *5ns, `1 / 2 ** length`
// So with `length` `100`, we get this error only once every `1e30` calls.
// We must use imperative code because the loop size is unknown.
export const getDefaultTimes = () => getTimes(DEFAULT_REPEAT)

const DEFAULT_REPEAT = 1e2

const getTimes = (length) => {
  const times = []
  // eslint-disable-next-line fp/no-let
  let lastTime = 0

  // eslint-disable-next-line fp/no-loops
  while (times.length < length) {
    const time = now()

    // If the resolution is very low, we need to perform `now()` several times
    // until the result changes
    // eslint-disable-next-line max-depth
    if (time !== lastTime) {
      // eslint-disable-next-line fp/no-mutation
      lastTime = time
      // eslint-disable-next-line fp/no-mutating-methods
      times.push(time)
    }
  }

  return times
}
