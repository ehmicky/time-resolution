import timeResolution from 'time-resolution'
import { expectType, expectError } from 'tsd'

expectType<number>(timeResolution())
timeResolution([])
timeResolution([1, 10])
expectError(timeResolution(1))
expectError(timeResolution(['1']))
