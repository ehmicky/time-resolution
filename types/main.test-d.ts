import { expectType, expectError } from 'tsd'

import timeResolution from './main.js'

expectType<number>(timeResolution())
timeResolution([])
timeResolution([1, 10])
expectError(timeResolution(1))
expectError(timeResolution(['1']))
