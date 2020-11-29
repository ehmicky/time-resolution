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

// Available time resolutions from 50ms, 10ms, 5ms, ... to 1ns.
// In nanoseconds.
const getPossibleResolutions = function () {
  return [].concat(
    ...Array.from({ length: MAX_RESOLUTION_EXPONENT }, getExponent).map(
      getPossibleResolution,
    ),
  )
}

// 8 digits after nanoseconds, i.e. 99ms-10ms
const MAX_RESOLUTION_EXPONENT = 8

const getExponent = function (value, index) {
  return MAX_RESOLUTION_EXPONENT - index - 1
}

const getPossibleResolution = function (exponent) {
  const scale = 10 ** exponent
  // eslint-disable-next-line no-magic-numbers
  return [5 * scale, scale]
}

const POSSIBLE_RESOLUTIONS = getPossibleResolutions()

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = timeResolution
