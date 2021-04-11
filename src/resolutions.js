// Available time resolutions: 5s, 1s, 500ms, ..., 5ns, 1ns.
// In nanoseconds.
export const getPossibleResolutions = function () {
  // TODO: replace with `flat()` when dropping support for Node 10
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
