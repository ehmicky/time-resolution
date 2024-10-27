import { getDefaultTimes } from './default.js'

/**
 * Returns the system's time resolution, in nanoseconds.
 *
 * @example
 * ```js
 * const resolution = timeResolution()
 * ```
 */
// If the resolution is <1ns, returns 1ns.
// Time resolution depends on a combination of hardware and software factors.
// An array of `times` can be passed
//  - This is only necessary when computing the time resolution of another
//    process that is either on a different machine or using a different
//    runtime
//  - Since this is an edge case, this is left undocumented, except in types
const timeResolution = (times: readonly number[] = getDefaultTimes()) =>
  POSSIBLE_RESOLUTIONS.find((resolution) =>
    isTimeResolution(resolution, times),
  ) ?? DEFAULT_MIN_RESOLUTION

export default timeResolution

// Available time resolutions: 5s, 1s, 500ms, ..., 5ns, 1ns.
// In nanoseconds.
/* eslint-disable @typescript-eslint/no-magic-numbers */
const POSSIBLE_RESOLUTIONS = [
  5e9, 1e9, 5e8, 1e8, 5e7, 1e7, 5e6, 1e6, 5e5, 1e5, 5e4, 1e4, 5e3, 1e3, 5e2,
  1e2, 5e1, 1e1, 5, 1,
]
/* eslint-enable @typescript-eslint/no-magic-numbers */
const DEFAULT_MIN_RESOLUTION = 1

// Check among all times if they fit a specific time resolution.
// We use imperative and avoid cloning `times` for performance.
// Some times might be `0` when the times are durations faster than the
// resolution
//  - Those are ignored
//  - However, if there are only `0` times, we default to the minimum resolution
// We search in reverse order since this is more efficient if the array is
// sorted from lowest to highest number:
//  - This would ensure `0` are at the end
//  - Lower numbers are less likely to trigger the resolution modulo
const isTimeResolution = (resolution: number, times: readonly number[]) => {
  // eslint-disable-next-line fp/no-let
  let count = 0
  const { length } = times

  // eslint-disable-next-line fp/no-loops, fp/no-let, fp/no-mutation
  for (let index = length - 1; index >= 0 && count < MAX_TIMES; index -= 1) {
    const time = times[index]!

    // eslint-disable-next-line max-depth
    if (time === 0) {
      // eslint-disable-next-line no-continue
      continue
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
