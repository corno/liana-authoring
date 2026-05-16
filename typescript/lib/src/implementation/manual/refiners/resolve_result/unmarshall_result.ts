import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_implement_me from 'pareto-core-dev/dist/implement_me'

import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_out from "../../../../interface/to_be_generated/resolve_result"

import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_variables from 'pareto-core/dist/_p_variables'

export const Document = (
    $: d_in.Document,
    $p: {
        'definition': d_in_definition.Resolver_Modules.D,
        'resolver': d_in_definition.Resolver
    }
): d_out.Document => ({
    'content': Value(
        $.content,
        {
            'definition': $p.definition['root value resolver'],
            'module parameters': _p.dictionary.literal({}),
            'resolver': $p.resolver
        }
    )
})


export const Value = (
    $: d_in.Value,
    $p: {
        'definition': d_in_definition.Resolver_Value,
        'resolver': d_in_definition.Resolver
        'module parameters': d_out.Parameters
    }
): d_out.Value => {
    return {
        'definition': $p.definition,
        'unmarshalled': $,
        'resolve result': _p.decide.state($['unmarshall result'], ($): d_out.Value_Resolve_Result => {
            switch ($[0]) {
                case 'error': return _p.ss($, ($) => ['unmarshall error', $])
                case 'success': return _p.ss($, ($) => {
                    const correct = $
                    return ['success', _p.decide.state($p.definition, ($): d_out.Resolved_Value_Type => {
                        switch ($[0]) {
                            case 'component': return _p.ss($, ($) => {
                                const def = $
                                return ['component', _p.decide.state(correct, ($) => {
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
                                                                    'no_such_entry': _p_unreachable_code_path("for every signature, there must be a resolver implemented")
                                                                }
                                                            )['root value resolver'])
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
                                return ['dictionary', _p.decide.state(correct, ($): d_out.Dictionary => {
                                    switch ($[0]) {
                                        case 'dictionary': return _p.ss($, ($): d_out.Dictionary => ({
                                            'unmarshalled': $,
                                            'entries': _p.dictionary.from.dictionary(
                                                _p.dictionary.from.list(
                                                    $.intermediate['entries as list']
                                                ).group(
                                                    ($) => $.intermediate['id value pair'].id.token.value
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
                                            ))
                                        }))
                                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'group': return _p.ss($, ($) => {
                                const def = $
                                return ['group', _p.decide.state(correct, ($): d_out.Group => {
                                    switch ($[0]) {
                                        case 'group': return _p.ss($, ($): d_out.Group => ({
                                            'unmarshalled': $,
                                            'properties': _p_variables(() => {
                                                return _p.dictionary.from.dictionary(
                                                    def
                                                ).join(
                                                    $.properties,
                                                    ($, $o, id): d_out.Property_Resolve_Result => {
                                                        const resolver = $.resolver
                                                        return $o.__decide(
                                                            ($) => _p.decide.state($.result, ($): d_out.Property_Resolve_Result => {
                                                                switch ($[0]) {
                                                                    case 'success': return _p.ss($, ($): d_out.Property_Resolve_Result => ['success', {
                                                                        'definition': resolver,
                                                                        'resolved': Value(
                                                                            $,
                                                                            {
                                                                                'definition': resolver,
                                                                                'resolver': $p.resolver,
                                                                                'module parameters': $p['module parameters'],
                                                                            }
                                                                        )
                                                                    }])
                                                                    case 'error': return _p.ss($, ($): d_out.Property_Resolve_Result => ['unmarshall error', $])
                                                                    default: return _p.au($[0])
                                                                }
                                                            }),
                                                            () => _p_unreachable_code_path("both dictionaries are driven by the definitions in the schema")
                                                        )
                                                    }
                                                )
                                            }),

                                        }))
                                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'list': return _p.ss($, ($) => {
                                const def = $
                                return ['list', _p.decide.state(correct, ($): d_out.List => {
                                    switch ($[0]) {
                                        case 'list': return _p.ss($, ($): d_out.List => ({
                                            'unmarshalled': $,
                                            'items': $.items.__l_map(($) => Value(
                                                $,
                                                {
                                                    'definition': def.resolver,
                                                    'resolver': $p.resolver,
                                                    'module parameters': $p['module parameters'],
                                                }
                                            ))
                                        }))
                                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'nothing': return _p.ss($, ($) => ['nothing', _p.decide.state(correct, ($) => {
                                switch ($[0]) {
                                    case 'nothing': return _p.ss($, ($) => $)
                                    default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            case 'simple': return _p.ss($, ($) => ['simple', _p.decide.state(correct, ($) => {
                                switch ($[0]) {
                                    case 'simple': return _p.ss($, ($) => $)
                                    default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            case 'optional': return _p.ss($, ($) => {
                                const def = $
                                return ['optional', _p.decide.state(correct, ($): d_out.Optional => {
                                    switch ($[0]) {
                                        case 'optional': return _p.ss($, ($): d_out.Optional => ({
                                            'unmarshalled': $,
                                            'status': _p.decide.state($.status, ($) => {
                                                switch ($[0]) {
                                                    case 'set': return _p.ss($, ($) => ['set', {
                                                        'child value': Value(
                                                            $['child value'],
                                                            {
                                                                'definition': def.resolver,
                                                                'resolver': $p.resolver,
                                                                'module parameters': $p['module parameters'],
                                                            }
                                                        )
                                                    }])
                                                    case 'not set': return _p.ss($, ($) => ['not set', null])
                                                    default: return _p.au($[0])
                                                }

                                            }),
                                        }))
                                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'reference': return _p.ss($, ($) => {
                                const def = $
                                return ['reference', _p.decide.state(correct, ($): d_out.Reference => {
                                    switch ($[0]) {
                                        case 'reference': return _p.ss($, ($) => ({
                                            'unmarshalled': $,
                                            'type': _p.decide.state($.type, ($) => {
                                                switch ($[0]) {
                                                    case 'derived': return _p.ss($, ($) => ['derived', null])
                                                    case 'selected': return _p.ss($, ($) => ['selected', {
                                                        'unmarshalled': $,
                                                        'resolve status': ['to be implemented', null]
                                                    }])
                                                    default: return _p.au($[0])
                                                }
                                            })
                                        }))
                                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'state': return _p.ss($, ($) => {
                                const def = $
                                return ['state', _p.decide.state(correct, ($) => {
                                    switch ($[0]) {
                                        case 'state': return _p.ss($, ($) => ({
                                            'unmarshalled': $,
                                            'option': _p.decide.state($['option status'], ($) => {
                                                switch ($[0]) {
                                                    case 'set': return _p.ss($, ($) => _p.optional.literal.set(Value(
                                                        $.value,
                                                        {
                                                            'definition': def.options.__get_entry_deprecated(
                                                                $.option,
                                                                {
                                                                    'no_such_entry': _p_unreachable_code_path("the definition is resolved")
                                                                }
                                                            ).resolver,
                                                            'resolver': $p.resolver,
                                                            'module parameters': $p['module parameters'],
                                                        }
                                                    )))
                                                    case 'missing data': return _p.ss($, ($) => _p.optional.literal.not_set())
                                                    default: return _p.au($[0])
                                                }
                                            })
                                        }))
                                        default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'text': return _p.ss($, ($) => ['text', _p.decide.state(correct, ($) => {
                                switch ($[0]) {
                                    case 'text': return _p.ss($, ($) => $)
                                    default: return _p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            default: return _p.au($[0])
                        }
                    })]
                })
                default: return _p.au($[0])
            }
        })
    }
}