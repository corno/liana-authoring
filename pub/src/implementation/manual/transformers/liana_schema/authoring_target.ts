import * as _p from 'pareto-core/dist/assign'
import _p_implement_me from 'pareto-core-dev/dist/implement_me'

import * as d_out from "astn/dist/interface/generated/liana/schemas/authoring_target/data"
import * as d_in from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"

export const Value = (
    $: d_in.Value,
    $p: {
        'style':
        | ['concise', null]
        | ['verbose', null]
    }
): d_out.Value => ({
    'metadata': {
        'comments': _p.list.literal([])
    },
    'data': Value_data($, $p)
})

export const Value_data = (
    $: d_in.Value,
    $p: {
        'style':
        | ['concise', null]
        | ['verbose', null]
    }
): d_out.Value.data => _p.decide.state($, ($): d_out.Value.data => {
    switch ($[0]) {
        case 'number': return _p.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['none', null],
                'value': "0"
            }]
        }])
        case 'boolean': return _p.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['none', null],
                'value': "false"
            }]
        }])
        case 'nothing': return _p.ss($, ($) => ['concrete', {
            'type': ['nothing', null]
        }])
        case 'text': return _p.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['quote', null],
                'value': ""
            }]
        }])
        case 'list': return _p.ss($, ($) => ['concrete', {
            'type': ['list', _p.list.literal([])]
        }])
        case 'reference': return _p.ss($, ($) => ['missing', null])
        case 'component': return _p.ss($, ($) => _p.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'external': return _p.ss($, ($) => Value_data($.module['l entry']['root value'], $p))
                case 'internal': return _p.ss($, ($) => Value_data($['l entry'].get_circular_dependent()['root value'], $p))
                case 'internal acyclic': return _p.ss($, ($) => Value_data($['l entry']['root value'], $p))
                default: return _p.au($[0])
            }
        })
        )
        case 'dictionary': return _p.ss($, ($) => ['concrete', {
            'type': ['dictionary', _p.list.literal([])]
        }])
        case 'group': return _p.ss($, ($): d_out.Value.data => {
            const xx = $
            return ['concrete', {
                'type': ['group', _p.decide.state($p.style, ($): d_out.Value.data.concrete.type_.group => {
                    switch ($[0]) {
                        case 'concise': return _p.ss($, ($) => ['concise', _p.list.from.dictionary(
                            xx
                        ).convert(
                            ($, id): d_out.Items.L => Value(
                                $.value,
                                $p
                            )
                        )])
                        case 'verbose': return _p.ss($, ($) => ['verbose', _p.list.from.dictionary(
                            xx
                        ).convert(
                            ($, id): d_out.ID_Value_Pairs.L => ({
                                'id': id,
                                'value': _p.optional.literal.set(Value(
                                    $.value,
                                    $p
                                ))
                            })
                        )])
                        default: return _p.au($[0])
                    }
                })]
            }]
        })
        case 'optional': return _p.ss($, ($) => ['concrete', {
            'type': ['nothing', null]
        }])
        case 'state': return _p.ss($, ($) => ['concrete', {
            'type': ['state', ['missing', null]]
        }])
        default: return _p.au($[0])
    }
})

export const Resolver_Value = (
    $: d_in.Resolver_Value,
): d_out.Value => ({
    'metadata': {
        'comments': _p.list.literal([])
    },
    'data': ['concrete', {
        'type': _p.decide.state($, ($): d_out.Value.data.concrete.type_ => {
            switch ($[0]) {
                case 'number': return _p.ss($, ($) => ['text', {
                    'delimiter': ['none', null],
                    'value': "0"
                }])
                case 'boolean': return _p.ss($, ($) => ['text', {
                    'delimiter': ['none', null],
                    'value': "false"
                }])
                case 'nothing': return _p.ss($, ($) => ['nothing', null])
                case 'text': return _p.ss($, ($) => ['text', {
                    'delimiter': ['quote', null],
                    'value': ""
                }])
                case 'list': return _p.ss($, ($) => ['list', _p.list.literal([])])
                case 'reference': return _p.ss($, ($) => ['text', {
                    'delimiter': ['apostrophe', null],
                    'value': "..."
                }])
                case 'component': return _p.ss($, ($) => _p.decide.state($.location, ($) => {
                    switch ($[0]) {
                        case 'external': return _p.ss($, ($) => _p_implement_me("xx"))
                        case 'internal': return _p.ss($, ($) => _p_implement_me("xx"))
                        default: return _p.au($[0])
                    }
                }))
                case 'dictionary': return _p.ss($, ($) => ['dictionary', _p.list.literal([])])
                case 'group': return _p.ss($, ($): d_out.Value.data.concrete.type_ => ['group', ['verbose', _p.list.from.dictionary(
                    $
                ).convert(
                    ($, id): d_out.ID_Value_Pairs.L => ({
                        'id': id,
                        'value': _p.optional.literal.set(Resolver_Value($.resolver))
                    })
                )]])
                case 'optional': return _p.ss($, ($) => ['nothing', null])
                case 'state': return _p.ss($, ($) => ['state', ['missing', null]])
                default: return _p.au($[0])
            }
        })
    }]

})
