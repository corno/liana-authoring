
import * as p_ from 'pareto-core/dist/implementation/transformer'

import p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/format/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/format/data"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

import * as v_text_edits from "../../text_edits/transformers/boilerplate_for_migrate"

export const Result: t_signatures.Result = ($) => v_text_edits.Text_Edits(
    $,
)

export const Error: t_signatures.Error = ($) => ({
    'message': p_change_context(
        $['message'],
        ($) => $,
    ),
})

export const Parameters: t_signatures.Parameters = ($) => ({
    'options': p_change_context(
        $['options'],
        ($) => ({
            'insert spaces': p_change_context(
                $['insert spaces'],
                ($) => $,
            ),
            'preserve delimiters': p_change_context(
                $['preserve delimiters'],
                ($) => $,
            ),
            'preserve final newline state': p_change_context(
                $['preserve final newline state'],
                ($) => $,
            ),
            'preserve commas': p_change_context(
                $['preserve commas'],
                ($) => $,
            ),
            'indent string': p_change_context(
                $['indent string'],
                ($) => $,
            ),
        }),
    ),
})
