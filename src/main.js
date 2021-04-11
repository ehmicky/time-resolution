import { getDefaultTimes } from './default.js'

// Retrieve system's time resolution in nanoseconds.
// If the resolution is <1ns, returns 1ns.
// Time resolution depends on a combination of hardware and software factors.
const timeResolution = function (times = getDefaultTimes()) {
  const currentResolution = POSSIBLE_RESOLUTIONS.find((resolution) =>
    isTimeResolution(resolution, times),
  )
  return currentResolution === undefined
    ? DEFAULT_MIN_RESOLUTION
    : currentResolution
}

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

// Check among all times if they fit a specific time resolution.
// We use imperative and avoid cloning `times` for performance.
// Some times might be `0` when the times are durations faster than the
// resolution
//  - Those are ignored
//  - However, if there are only `0` times, we default to the minimum resolution
// eslint-disable-next-line complexity
const isTimeResolution = function (resolution, times) {
  // eslint-disable-next-line fp/no-let
  let count = 0

  // eslint-disable-next-line fp/no-loops
  for (const time of times) {
    // eslint-disable-next-line max-depth
    if (time === 0) {
      // eslint-disable-next-line no-continue
      continue
    }

    // eslint-disable-next-line max-depth
    if (count >= MAX_TIMES) {
      break
    }

    // eslint-disable-next-line fp/no-mutation
    count += 1

    // eslint-disable-next-line max-depth
    if (time % resolution !== 0) {
      return false
    }
  }

  return count !== 0
}

// After checking many times, the probability of error are so small
// (8e-31 to 1e-70) that it is not worth not continuing.
// This is much faster when the `times` array is very big.
const MAX_TIMES = 1e2

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = timeResolution
