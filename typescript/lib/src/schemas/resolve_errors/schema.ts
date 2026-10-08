import * as p_ from 'pareto-core/schema'

import type * as s_location from "astn-runtime/modules/deserialization/schemas/location/schema"

export type Error = {
    'range': s_location.Range
    'type':
    | ['to be implemented', null]
    | ['no such entry', string]
    | ['no context lookup', null]
    | ['cycle detected', p_.List<string>]
    | ['entry unavailable', string]
    | ['premature cyclic access', null]
    | ['selection unavailable', null]
    | ['optional value not set', null]
    | ['unexpected state', { 'expected': string, 'actual': string }]
    'severity':
    | ['error', null]
    | ['warning', null]
    | ['hint', null]
}

export type Errors = p_.List<Error>