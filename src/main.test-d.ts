import timeResolution from 'time-resolution'
import { expectType } from 'tsd'


expectType<number>(timeResolution())
// @ts-expect-error
timeResolution(1)

timeResolution([] as const)
timeResolution([1] as const)
// @ts-expect-error
timeResolution(['1'] as const)
