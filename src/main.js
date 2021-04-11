import { getDefaultTimes } from './get.js'
import { getPossibleResolutions } from './resolutions.js'

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

const POSSIBLE_RESOLUTIONS = getPossibleResolutions()

const DEFAULT_MIN_RESOLUTION =
  POSSIBLE_RESOLUTIONS[POSSIBLE_RESOLUTIONS.length - 1]

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = timeResolution
