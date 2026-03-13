import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_implement_me from 'pareto-core-dev/dist/implement_me'

import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_out from "../../../../interface/to_be_generated/resolve_result"

import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'


export const Value = (
    $: d_in.Value,
    $p: {
        'definition': d_in_definition.Resolver_Value,
        'resolver': d_in_definition.Resolver
        'module parameters': d_out.Parameters
    }
): d_out.Value => {
    const unmarshall_result = $
    return {
        'definition': $p.definition,
        'unmarshalled': $,
        'resolved': _p.decide.state($p.definition, ($): d_out.Resolved_Value_Type => {
            switch ($[0]) {
                case 'boolean': return _p.ss($, ($) => ['boolean', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                    switch ($[0]) {
                        case 'boolean': return _p.ss($, ($) => $)
                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                    }
                })])
                case 'component': return _p.ss($, ($) => {
                    const def = $
                    return ['component', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                        switch ($[0]) {
                            case 'component': return _p.ss($, ($) => ({
                                'unmarshalled': $,
                                'value': Value(
                                    $.value,
                                    {
                                        'definition': _p.decide.state(def.location, ($) => {
                                            switch ($[0]) {
                                                case 'external': return _p.ss($, ($) => _p_implement_me("!!!!!!!"))
                                                case 'internal': return _p.ss($, ($) => $p.resolver.modules.__get_entry_deprecated(
                                                    $['l id'],
                                                    {
                                                        'no_such_entry': _p_unreachable_code_path("the definition is resolved")
                                                    }
                                                ))['root value resolver']
                                                default: return _p.au($[0])
                                            }
                                        }),
                                        'resolver': $p.resolver,
                                        'module parameters': def.signature['resolved parameters'].modules.__d_map(($) => ['needs implementation', null])
                                    }
                                )
                            }))
                            default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                        }
                    })]
                })
                case 'dictionary': return _p.ss($, ($) => {
                    const def = $
                    return ['dictionary', _p.decide.state(unmarshall_result.unmarshalled, ($): d_out.Dictionary => {
                        switch ($[0]) {
                            case 'dictionary': return _p.ss($, ($): d_out.Dictionary => ({
                                'unmarshalled': $,
                                'entries': _p.decide.state($['found value type'], ($) => {
                                    switch ($[0]) {
                                        case 'valid': return _p.ss($, ($) => _p.optional.literal.set(_p.dictionary.from.dictionary(
                                            _p.dictionary.from.list(
                                                $.entries
                                            ).group(
                                                ($) => $['id value pair'].id.token.value
                                            )
                                        ).map(($, id): d_out.Optional_Entry => _p.decide.list($).has_single_item(
                                            ($) => $.value.__decide(
                                                ($) => _p.optional.literal.set(Value(
                                                    $,
                                                    {
                                                        'definition': def.resolver,
                                                        'resolver': $p.resolver,
                                                        'module parameters': $p['module parameters'],
                                                    }
                                                )),
                                                () => _p.optional.literal.not_set(),
                                            ),
                                            () => _p.optional.literal.not_set(),
                                            () => _p.optional.literal.not_set(),
                                        ))))

                                        // $['optional value'].__decide(

                                        //             () => _p.optional.literal.not_set(),
                                        //         )
                                        case 'invalid': return _p.ss($, ($) => _p.optional.literal.not_set())
                                        default: return _p.au($[0])
                                    }
                                })
                            }))
                            default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                        }
                    })]
                })
                case 'group': return _p.ss($, ($) => {
                    const def = $
                    return ['group', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                        switch ($[0]) {
                            case 'group': return _p.ss($, ($) => ({
                                'unmarshalled': $,
                                'properties': _p.decide.state($['found value type'], ($) => {
                                    switch ($[0]) {
                                        case 'valid': return _p.ss($, ($) => {
                                            const unmarshalled_properties: _pi.Dictionary<_pi.Optional_Value<d_in.Value>> = _p_implement_me("!!!!!!!")
                                            // const unmarshalled_properties: _pi.Dictionary<_pi.Optional_Value<d_in.Value>> = _p.decide.state($.type, ($) => {
                                            //     switch ($[0]) {
                                            //         case 'verbose': return _p.ss($, ($) => $.properties.__d_map(($) => $.__get_number_of_items() === 0
                                            //             ? _p.optional.literal.not_set()
                                            //             : $.__deprecated_get_possible_item_at(0).__decide(
                                            //                 ($) => $.value.__decide(
                                            //                     ($) => _p.optional.literal.set($),
                                            //                     () => _p.optional.literal.not_set(),
                                            //                 ),
                                            //                 () => _p.optional.literal.not_set(),
                                            //             )
                                            //         ))
                                            //         case 'concise': return _p.ss($, ($) => $.properties.__d_map(($) => $.__decide(
                                            //             ($) => _p.optional.literal.set($),
                                            //             () => _p.optional.literal.not_set(),
                                            //         )))
                                            //         default: return _p.au($[0])
                                            //     }
                                            // })
                                            return _p.dictionary.from.dictionary(
                                                def
                                            ).join(
                                                unmarshalled_properties,
                                                ($, $o, id) => {
                                                    const resolver = $.resolver
                                                    return {
                                                        'definition': $.resolver,
                                                        'resolved': $o.__decide(
                                                            ($) => $.__decide(
                                                                ($) => _p.optional.literal.set(Value(
                                                                    $,
                                                                    {
                                                                        'definition': resolver,
                                                                        'resolver': $p.resolver,
                                                                        'module parameters': $p['module parameters'],
                                                                    }
                                                                )),
                                                                () => _p.optional.literal.not_set(),
                                                            ),
                                                            () => _p.optional.literal.not_set(),
                                                        )
                                                    }
                                                }
                                            )
                                        })
                                        case 'invalid': return _p.ss($, ($) => def.__d_map(($): d_out.Property => ({
                                            'definition': $.resolver,
                                            'resolved': _p.optional.literal.not_set()
                                        })))
                                        default: return _p.au($[0])
                                    }
                                }),

                            }))
                            default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                        }
                    })]
                })
                case 'list': return _p.ss($, ($) => {
                    const def = $
                    return ['list', _p.decide.state(unmarshall_result.unmarshalled, ($): d_out.List => {
                        switch ($[0]) {
                            case 'list': return _p.ss($, ($): d_out.List => ({
                                'unmarshalled': $,
                                'items': _p.decide.state($['found value type'], ($) => {
                                    switch ($[0]) {
                                        case 'valid': return _p.ss($, ($) => _p.optional.literal.set($.items.__l_map(($) => Value(
                                            $,
                                            {
                                                'definition': def.resolver,
                                                'resolver': $p.resolver,
                                                'module parameters': $p['module parameters'],
                                            }
                                        ))))
                                        case 'invalid': return _p.ss($, ($) => _p.optional.literal.not_set())
                                        default: return _p.au($[0])
                                    }
                                })
                            }))
                            default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                        }
                    })]
                })
                case 'nothing': return _p.ss($, ($) => ['nothing', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                    switch ($[0]) {
                        case 'nothing': return _p.ss($, ($) => $)
                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                    }
                })])
                case 'number': return _p.ss($, ($) => ['number', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                    switch ($[0]) {
                        case 'number': return _p.ss($, ($) => $)
                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                    }
                })])
                case 'optional': return _p.ss($, ($) => {
                    const def = $
                    return ['optional', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                        switch ($[0]) {
                            case 'optional': return _p.ss($, ($) => ({
                                'unmarshalled': $,
                                'optional optional value': _p.decide.state($['found value type'], ($) => {
                                    switch ($[0]) {
                                        case 'valid': return _p.ss($, ($) => _p.optional.literal.set(_p.decide.state($, ($) => {
                                            switch ($[0]) {
                                                case 'set': return _p.ss($, ($) => _p.optional.literal.set(Value(
                                                    $['child value'],
                                                    {
                                                        'definition': def.resolver,
                                                        'resolver': $p.resolver,
                                                        'module parameters': $p['module parameters'],
                                                    }
                                                )))
                                                case 'not set': return _p.ss($, ($) => _p.optional.literal.not_set())
                                                default: return _p.au($[0])
                                            }
                                        })))
                                        case 'invalid': return _p.ss($, ($) => _p.optional.literal.not_set())
                                        default: return _p.au($[0])
                                    }
                                })
                            }))
                            default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                        }
                    })]
                })
                case 'reference': return _p.ss($, ($) => {
                    const def = $
                    return ['reference', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                        switch ($[0]) {
                            case 'reference': return _p.ss($, ($) => ({
                                'unmarshalled': $
                            }))
                            default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                        }
                    })]
                })
                case 'state': return _p.ss($, ($) => {
                    const def = $
                    return ['state', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                        switch ($[0]) {
                            case 'state': return _p.ss($, ($) => ({
                                'unmarshalled': $,
                                'option': _p.decide.state($['found value type'], ($) => {
                                    switch ($[0]) {
                                        case 'valid': return _p.ss($, ($) => _p.decide.state($['option'], ($) => {
                                            switch ($[0]) {
                                                case 'set': return _p.ss($, ($) => {
                                                    const option_token = $['option token']
                                                    return _p.decide.state($.option, ($) => {
                                                        switch ($[0]) {
                                                            case 'known': return _p.ss($, ($) => _p.optional.literal.set(Value(
                                                                $.value,
                                                                {
                                                                    'definition': def.options.__get_entry_deprecated(
                                                                        option_token.token.value,
                                                                        {
                                                                            'no_such_entry': _p_unreachable_code_path("the definition is resolved")
                                                                        }
                                                                    ).resolver,
                                                                    'resolver': $p.resolver,
                                                                    'module parameters': $p['module parameters'],
                                                                }
                                                            )))
                                                            case 'unknown': return _p.ss($, ($) => _p.optional.literal.not_set())
                                                            default: return _p.au($[0])
                                                        }
                                                    })
                                                })
                                                case 'missing data': return _p.ss($, ($) => _p.optional.literal.not_set())
                                                default: return _p.au($[0])
                                            }
                                        }))
                                        case 'invalid': return _p.ss($, ($) => _p.optional.literal.not_set())
                                        case 'list format error': return _p.ss($, ($) => _p.optional.literal.not_set())
                                        default: return _p.au($[0])
                                    }
                                })
                            }))
                            default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                        }
                    })]
                })
                case 'text': return _p.ss($, ($) => ['text', _p.decide.state(unmarshall_result.unmarshalled, ($) => {
                    switch ($[0]) {
                        case 'text': return _p.ss($, ($) => $)
                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                    }
                })])
                default: return _p.au($[0])
            }
        })
    }
}