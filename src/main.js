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

// Check among all times if they fit a specific time resolution
const isTimeResolution = function (resolution, times) {
  return times.every((time) => time % resolution === 0)
}

const POSSIBLE_RESOLUTIONS = getPossibleResolutions()

const DEFAULT_MIN_RESOLUTION =
  POSSIBLE_RESOLUTIONS[POSSIBLE_RESOLUTIONS.length - 1]

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = timeResolution
