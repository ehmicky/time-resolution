import { expectType, expectError } from 'tsd'

import timeResolution from 'time-resolution'

expectType<number>(timeResolution())
expectError(timeResolution(1))
