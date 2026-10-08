import * as p_ from 'pareto-core/transformer'
import type * as s_in from '../schema.js'
import type * as s_unmarshalled from '../../unmarshall_result/schema.js'
import type * as s_out from '../../completion_suggestions/schema.js'
import type * as s_location from '../../location/schema.js'
import * as found from '../../unmarshall_result/transformers/found.js'
import * as structural from '../../unmarshall_result/transformers/completion_suggestions.js'
import * as serialize from 'astn/modules/authoring_target/schemas/authoring_target/transformers/serialized'
import * as full_range from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range'

const Find_Value = (value: s_in.Value, input: s_unmarshalled.Value): s_in.Value | null => {
    if (value.unmarshalled === input) return value
    const status = value['unmarshall result']
    if (status[0] !== 'success') return null
    const type = status[1]
    switch (type[0]) {
        case 'component': return Find_Value(type[1].value, input)
        case 'dictionary':
            for (const entry of type[1].entries.__get_raw()) {
                const status = entry[1]['unmarshall result']
                if (status[0] === 'success' && status[1].value[0] === 'set') {
                    const result = Find_Value(status[1].value[1], input)
                    if (result !== null) return result
                }
            }
            return null
        case 'group':
            for (const property of type[1].properties.__get_raw()) {
                const status = property[1]['unmarshall result']
                if (status[0] === 'success') {
                    const result = Find_Value(status[1].resolved, input)
                    if (result !== null) return result
                }
            }
            return null
        case 'list':
            for (const item of type[1].items.__get_raw()) {
                const result = Find_Value(item, input)
                if (result !== null) return result
            }
            return null
        case 'optional': return type[1].status[0] === 'set' ? Find_Value(type[1].status[1]['child value'], input) : null
        case 'state': return p_.from.optional(type[1].option).decide(value => Find_Value(value, input), () => null)
        case 'reference':
        case 'simple':
        case 'nothing':
        case 'text': return null
        default: return p_.exhaustive(type[0])
    }
}

export const Document = (
    document: s_in.Document,
    parameters: { position: s_location.Position, indent: string, style: ['verbose', null] | ['concise', null] },
): s_out.Completion_Suggestions => {
    const selected = found.Document(document.unmarshalled, { position: parameters.position })
    if (selected[0] !== 'value') return structural.Found(selected, parameters)
    const value = Find_Value(document.content, selected[1])
    if (value === null || value['reference identifiers'] === undefined) return structural.Found(selected, parameters)
    const identifiers = value['reference identifiers'].get_circular_dependent()
    const range = full_range.Value(selected[1].instance)
    const seen: { [id: string]: boolean | undefined } = {}
    return p_.literal.set({
        type: ['reference', null],
        'replace range': {
            start: { line: range.start.relative.line, character: range.start.relative.column },
            end: { line: range.end.relative.line, character: range.end.relative.column },
        },
        suggestions: p_.from.list(p_.from.list(identifiers).filter(id => {
            const key = ':' + id
            if (seen[key] === true) return false
            seen[key] = true
            return true
        })).map(id => ({
            label: id,
            documentation: '',
            'insert lines': serialize.Value({
                data: ['concrete', { type: ['text', {
                    delimiter: ['apostrophe', null], value: id, trivia: { comments: p_.literal.list([]) },
                }] }],
            }, { paragraph: { indentation: parameters.indent }, value: { 'write delimiters': true } }),
        })),
    })
}
