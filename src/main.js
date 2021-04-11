import { getDefaultTimes } from './get.js'

// Retrieve system's time resolution in nanoseconds.
// If the resolution is <1ns, returns 1ns.
// Time resolution depends on a combination of hardware and software factors.
const timeResolution = function (times = getDefaultTimes()) {
  if (shouldUseDefault(times)) {
    return DEFAULT_MIN_RESOLUTION
  }

  return POSSIBLE_RESOLUTIONS.find((resolution) =>
    isTimeResolution(resolution, times),
  )
}

const shouldUseDefault = function (times) {
  return times.length === 0
}

// Check among all times if they fit a specific time resolution.
// We use imperative and avoid cloning `times` for performance.
const isTimeResolution = function (resolution, times) {
  const maxTimes = Math.min(MAX_TIMES, times.length)

  // eslint-disable-next-line fp/no-let, fp/no-mutation, fp/no-loops
  for (let index = 0; index < maxTimes; index += 1) {
    // eslint-disable-next-line max-depth
    if (times[index] % resolution !== 0) {
      return false
    }
  }

  return true
}

// After checking many times, the probability of error are so small
// (8e-31 to 1e-70) that it is not worth not continuing.
// This is much faster when the `times` array is very big.
const MAX_TIMES = 1e2

// Available time resolutions: 5s, 1s, 500ms, ..., 5ns, 1ns.
// In nanoseconds.
/* eslint-disable no-magic-numbers */
const POSSIBLE_RESOLUTIONS = [
  5e9,
  1e9,
  5e8,
  1e8,
  5e7,
  1e7,
  5e6,
  1e6,
  5e5,
  1e5,
  5e4,
  1e4,
  5e3,
  1e3,
  5e2,
  1e2,
  5e1,
  1e1,
  5,
  1,
]
const DEFAULT_MIN_RESOLUTION = 1
/* eslint-enable no-magic-numbers */

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = timeResolution
