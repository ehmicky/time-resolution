import { expectType } from 'tsd'

import timeResolution from 'time-resolution'

expectType<number>(timeResolution())
// @ts-expect-error
timeResolution(1)
