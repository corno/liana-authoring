// import * as _p from 'pareto-core/dist/query'
// import * as _pi from 'pareto-core/dist/interface'
// import * as _p_temp_transformer from 'pareto-core/dist/assign'

// import * as signatures from "../../../interface/signatures"

// //data types
// import * as d from "../../../interface/generated/liana/schemas/server/data"
// import * as d_token from "astn-core/dist/interface/generated/liana/schemas/token/data"
// import * as d_ide from "astn/dist/interface/generated/liana/schemas/ide/data"
// import * as d_parse_result from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"

// //dependencies
// import * as ds_path from "pareto-resources/dist/implementation/manual/schemas/node_path/deserializers"
// import * as t_unmarshall_result_2_unmarshall_errors from "pareto/dist/implementation/manual/schemas/unmarshall_result/transformers/unmarshall_errors"
// import { $$ as q_get_unmarshalled_document } from "pareto/dist/implementation/manual/queries/load_pareto_document"
// import { $$ as s_list_of_separated_texts } from "pareto-standard-operations/dist/implementation/temp_serializers/schemas/list_of_separated_texts"



// const create_frontend_position_from_relative_location = ($: d_token.Relative_Location): d.Position => ({
//     line: $.line,
//     character: $.column
// })

// const create_frontend_range_from_relative_range = ($: d_ide.Relative_Range): d.Range => ({
//     start: create_frontend_position_from_relative_location($.start),
//     end: create_frontend_position_from_relative_location($.end),
// })

// const create_frontend_range_from_range = ($: d_token.Range): d.Range => (create_frontend_range_from_relative_range({
//     'start': $.start.relative,
//     'end': $.end.relative,
// }))


// // export const $$: _pi.Guaranteed_Query<d.Validate_Document_Parameters, d.On_Validate_Document_Result, Resources> = (
// //     $p, $r
// // ) => load_astn_document(
// //     {
// //         'content': $p.content,
// //         'file path': $p['file path'],
// //     },
// //     $r,
// // ).map_(
// //     ($): d.On_Validate_Document_Result => ({
// //         'diagnostics': t_unmarshall_result_2_unmarshall_errors.Node($, null).__d_map(($): d.Diagnostic => ({

// //             'severity': _pt.decide.state($.type, ($) => {
// //                 switch ($[0]) {
// //                     case 'error': return _pt.ss($, ($) => ['error', null])
// //                     case 'warning': return _pt.ss($, ($) => ['warning', null])
// //                     default: return _pt.au($[0])
// //                 }
// //             }),
// //             'range': create_frontend_range_from_range($.range),
// //             'message': _pt.decide.state($.type, ($) => {
// //                 switch ($[0]) {
// //                     case 'error': return _pt.ss($, ($) => _pt.decide.state($, ($) => _pt.decide.state($, ($) => {
// //                         switch ($[0]) {
// //                             case 'duplicate property': return _pt.ss($, ($) => "Duplicate property '${$.name}'")
// //                             case 'invalid value type': return _pt.ss($, ($) => "Invalid type, expected ${s_list_of_separated_texts($.expected.__d_map(($) => "'${$[0]}'"), { 'separator': " or " })}")
// //                             case 'missing property': return _pt.ss($, ($) => "Missing property '${$.name}'")
// //                             case 'state': return _pt.ss($, ($) => _pt.decide.state($, ($) => {
// //                                 switch ($[0]) {
// //                                     case 'missing state name': return _pt.ss($, ($) => "Missing state name")
// //                                     case 'missing data marker': return _pt.ss($, ($) => "Missing data marker for state 'XXXX'")
// //                                     case 'missing value': return _pt.ss($, ($) => "Missing value for state 'XXXX'")
// //                                     case 'more than 2 elements': return _pt.ss($, ($) => "State 'XXXX' has more than 2 elements")
// //                                     case 'state is not a string': return _pt.ss($, ($) => "State 'XXXX' is not a string")
// //                                     case 'unknown state': return _pt.ss($, ($) => "this state does not exist, choose from ${s_list_of_separated_texts(op_dictionary_to_list($.expected).__d_map(($) => "'${$.key}'"), { 'separator': " or " })}")
// //                                     default: return _pt.au($[0])
// //                                 }
// //                             }))
// //                             case 'superfluous property': return _pt.ss($, ($) => "Superfluous property '${$.name}'")
// //                             default: return _pt.au($[0])
// //                         }
// //                     })))
// //                     case 'warning': return _pt.ss($, ($) => _pt.decide.state($, ($) => "${$[0]} (FIXME: more info)"))
// //                     default: return _pt.au($[0])
// //                 }
// //             }),
// //             'related information': _pt.not_set()
// //         }))
// //     })
// // ).catch_(($) => {
// //     return _easync.query.guaranteed['create result']<d.On_Validate_Document_Result>({
// //         'diagnostics': _pt.decide.state(
// //             $,
// //             ($): d.Diagnostics => {
// //                 switch ($[0]) {
// //                     case 'no schema file': return _pt.ss($, ($) => _pt.list.literal<d.Diagnostic>([
// //                         {
// //                             'severity': ['error', null],
// //                             'range': {
// //                                 'start': {
// //                                     'line': 0,
// //                                     'character': 0,
// //                                 },
// //                                 'end': {
// //                                     'line': 0,
// //                                     'character': 0,
// //                                 }
// //                             },
// //                             'message': "No schema file found",
// //                             'related information': _pt.not_set()
// //                         }


// //                     ]))
// //                     case 'schema error': return _pt.ss($, ($) => _pt.list.literal<d.Diagnostic>([
// //                         {
// //                             'severity': ['error', null],
// //                             'range': {
// //                                 'start': {
// //                                     'line': 0,
// //                                     'character': 0,
// //                                 },
// //                                 'end': {
// //                                     'line': 0,
// //                                     'character': 0,
// //                                 }
// //                             },
// //                             'message': "error in schema: ${$['file location']}",
// //                             'related information': _pt.set(_pt.list.literal([
// //                                 {
// //                                     'location': {
// //                                         'file path': "FIXME/PATH/TO/SCHEMA",
// //                                         'range': {
// //                                             'start': { 'line': 0, 'character': 0 },
// //                                             'end': { 'line': 0, 'character': 0 }
// //                                         }
// //                                     },
// //                                     'message': 'Dependency declared here'
// //                                 }
// //                             ]))

// //                         }


// //                     ]))
// //                     case 'parse error': return _pt.ss($, ($) => _pt.list.literal<d.Diagnostic>([
// //                         {
// //                             'severity': ['error', null],
// //                             'range': create_frontend_range_from_range($.range),
// //                             'message': "${d_parse_result.Parse_Error_Type($.type)}",
// //                             'related information': _pt.not_set()
// //                         }
// //                     ]))
// //                     default: return _pt.au($[0])
// //                 }
// //             }
// //         )
// //     })
// // })



// export const $$: signatures.queries.validate_document = _p.query_function(
//     ($p, $qr) => q_get_unmarshalled_document($qr)(
//         {
//             'content': $p.content,
//             'file path': ds_path.Node_Path(
//                 $p['file path'],
//                 () => _pdev.implement_me("Invalid file path"),
//                 {
//                     'pedantic': true,
//                 },
//             ),
//         },
//         ($): d.On_Validate_Document_Result => ({
//             'diagnostics': _p.decide.state(
//                 $,
//                 ($): d.Diagnostics => {
//                     switch ($[0]) {
//                         case 'no schema file': return _p.ss($, ($) => _p.list.literal<d.Diagnostic>([
//                             {
//                                 'severity': ['error', null],
//                                 'range': {
//                                     'start': {
//                                         'line': 0,
//                                         'character': 0,
//                                     },
//                                     'end': {
//                                         'line': 0,
//                                         'character': 0,
//                                     }
//                                 },
//                                 'message': "No schema file found",
//                                 'related information': _p.optional.literal.not_set()
//                             }


//                         ]))
//                         case 'schema error': return _p.ss($, ($) => _p.list.literal<d.Diagnostic>([
//                             {
//                                 'severity': ['error', null],
//                                 'range': {
//                                     'start': {
//                                         'line': 0,
//                                         'character': 0,
//                                     },
//                                     'end': {
//                                         'line': 0,
//                                         'character': 0,
//                                     }
//                                 },
//                                 'message': "error in schema: ${$['file location']}",
//                                 'related information': _p.optional.literal.set(_p.list.literal([
//                                     {
//                                         'location': {
//                                             'file path': "FIXME/PATH/TO/SCHEMA",
//                                             'range': {
//                                                 'start': { 'line': 0, 'character': 0 },
//                                                 'end': { 'line': 0, 'character': 0 }
//                                             }
//                                         },
//                                         'message': 'Dependency declared here'
//                                     }
//                                 ]))

//                             }


//                         ]))
//                         case 'parse error': return _p.ss($, ($) => _p.list.literal<d.Diagnostic>([
//                             {
//                                 'severity': ['error', null],
//                                 'range': create_frontend_range_from_range($.range.__decide(
//                                     ($) => $,
//                                     () => ({
//                                         'end': { 'absolute': 0, 'relative': { 'line': 0, 'column': 0 } },
//                                         'start': { 'absolute': 0, 'relative': { 'line': 0, 'column': 0 } },
//                                     })
//                                 )),
//                                 'message': "${d_parse_result.Error($, { 'position info': ['zero based', null] })}",
//                                 'related information': _p.optional.literal.not_set()
//                             }
//                         ]))
//                         case 'unmarshall error': return _p.ss($, ($) => _p.list.literal<d.Diagnostic>([
//                             {
//                                 'severity': ['error', null],
//                                 'range': {
//                                     'start': {
//                                         'line': 0,
//                                         'character': 0,
//                                     },
//                                     'end': {
//                                         'line': 0,
//                                         'character': 0,
//                                     }
//                                 },
//                                 'message': "unmarshall error (no further information available currently)",
//                                 'related information': _p.optional.literal.not_set()
//                             }
//                         ]))
//                         default: return _p.au($[0])
//                     }
//                 }
//             )
//         }),
//     ).transform_result(($): d.On_Validate_Document_Result => ({
//         'diagnostics': t_unmarshall_result_2_unmarshall_errors.Node($, null).__l_map(($): d.Diagnostic => ({

//             'severity': _p.decide.state($.type, ($) => {
//                 switch ($[0]) {
//                     case 'error': return _p.ss($, ($) => ['error', null])
//                     case 'warning': return _p.ss($, ($) => ['warning', null])
//                     default: return _p.au($[0])
//                 }
//             }),
//             'range': create_frontend_range_from_range($.range),
//             'message': _p.decide.state($.type, ($) => {
//                 switch ($[0]) {
//                     case 'error': return _p.ss($, ($) => _p.decide.state($, ($) => _p.decide.state($, ($) => {
//                         switch ($[0]) {
//                             case 'duplicate property': return _p.ss($, ($) => "Duplicate property '${$.name}'")
//                             case 'invalid value type': return _p.ss($, ($) => "Invalid type, expected ${s_list_of_separated_texts($.expected.__l_map(($) => "'${$[0]}'"), { 'separator': " or " })}")
//                             case 'missing property': return _p.ss($, ($) => "Missing property '${$.name}'")
//                             case 'state': return _p.ss($, ($) => _p.decide.state($, ($) => {
//                                 switch ($[0]) {
//                                     case 'missing state name': return _p.ss($, ($) => "Missing state name")
//                                     case 'missing data marker': return _p.ss($, ($) => "Missing data marker for state 'XXXX'")
//                                     case 'missing value': return _p.ss($, ($) => "Missing value for state 'XXXX'")
//                                     case 'more than 2 elements': return _p.ss($, ($) => "State 'XXXX' has more than 2 elements")
//                                     case 'state is not a string': return _p.ss($, ($) => "State 'XXXX' is not a string")
//                                     case 'unknown state': return _p.ss($, ($) => "this state does not exist, choose from ${s_list_of_separated_texts(
//                                         _p_temp_transformer.list.from_dictionary($.expected, ($, id) => "'${key}'"),
//                                         { 'separator': " or " }
//                                     )}")
//                                     default: return _p.au($[0])
//                                 }
//                             }))
//                             case 'superfluous property': return _p.ss($, ($) => "Superfluous property '${$.name}'")
//                             default: return _p.au($[0])
//                         }
//                     })))
//                     case 'warning': return _p.ss($, ($) => _p.decide.state($, ($) => "${$[0]} (FIXME: more info)"))
//                     default: return _p.au($[0])
//                 }
//             }),
//             'related information': _p.optional.literal.not_set()
//         }))
//     }))
// )