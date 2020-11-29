import { getDefaultTimes } from './get.js'

// Retrieve system's time resolution in nanoseconds.
// If the resolution is <1ns, returns 1ns.
// Time resolution depends on a combination of hardware and software factors.
const timeResolution = function (times = getDefaultTimes()) {
  return POSSIBLE_RESOLUTIONS.find((resolution) =>
    isTimeResolution(resolution, times),
  )
}

// Check among all `now()` if they fit a specific time resolution
const isTimeResolution = function (resolution, times) {
  return times.every((time) => time % resolution === 0)
}

// Available time resolutions: 5s, 1s, 500ms, ..., 5ns, 1ns.
// In nanoseconds.
const getPossibleResolutions = function () {
  // eslint-disable-next-line fp/no-mutating-methods
  return []
    .concat(
      ...Array.from({ length: MAX_RESOLUTION_EXPONENT }, getPossibleResolution),
    )
    .reverse()
}

const getPossibleResolution = function (value, index) {
  const scale = 10 ** index
  // eslint-disable-next-line no-magic-numbers
  return [scale, 5 * scale]
}

// 10 digits after nanoseconds, i.e. 5s and 1s
const MAX_RESOLUTION_EXPONENT = 10

const POSSIBLE_RESOLUTIONS = getPossibleResolutions()

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = timeResolution
