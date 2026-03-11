import * as _pi from 'pareto-core/dist/interface'

import * as d_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"

export type Document = {
    'content': Value
}

export type Optional_Value = _pi.Optional_Value<Value>

// export type Key_Value_Pair = {
//     'node': Node
// }


export type Value = {
    'definition path': string
    'definition': d_schema.Value
    'instance': d_astn_parse_tree.Value
    'unmarshalled': Unmarshalled_Value_Type //the type is determined by the definition
}

export type Unmarshalled_Value_Type =
    | ['missing', null]
    | ['boolean', Boolean]
    | ['component', Component]
    | ['dictionary', Dictionary]
    | ['group', Group]
    | ['list', List]
    | ['nothing', Nothing]
    | ['number', Number]
    | ['optional', Optional]
    | ['reference', Reference]
    | ['state', State]
    | ['text', Text]


export type Boolean = {
    'definition': d_schema.Value.boolean_
    'found value type':
    | ['valid', {
        'instance': d_astn_parse_tree.Value.type_.concrete.text
        'correct string type': boolean
    }]
    | ['invalid', d_astn_parse_tree.Value]
}

export type Component = {
    'definition': d_schema.Value.component
    'value': Value
}

export type Dictionary = {
    'definition': d_schema.Value.dictionary
    'found value type':
    | ['valid', {
        'instance': d_astn_parse_tree.Value.type_.concrete.dictionary
        'entries': _pi.List<Entry_Data>
    }]
    | ['invalid', d_astn_parse_tree.Value]
}

export type Group = {
    'definition': d_schema.Value.group
    'found value type': Group_Found_Value_Type
}

export type Group_Found_Value_Type =
    | ['valid', {
        'instance':
        | ['group', d_astn_parse_tree.Value.type_.concrete.group]
        | ['dictionary', d_astn_parse_tree.Value.type_.concrete.dictionary]
        | ['list', d_astn_parse_tree.Value.type_.concrete.list]
        'type': Group_Type
    }]
    | ['invalid', d_astn_parse_tree.Value]

export type Group_Type =
    | ['verbose', Group_Verbose]
    | ['concise', Group_Concise]

export type Group_Concise = {
    'properties': _pi.List<Concise_Property>
}

export type Concise_Property = {
    'item': d_astn_parse_tree.Items.L
    'definition found': Concise_Property_Definition_Found
}

export type Concise_Property_Definition_Found =
    | ['yes', Concise_Property_Definition_Found__yes]
    | ['no', null]

export type Concise_Property_Definition_Found__yes = {
    'definition': d_schema.Group.D
    'id': string,
    'value': Value
}

export type Verbose_Property = {
    'id value pair': d_astn_parse_tree.ID_Value_Pairs.L
    'definition found': Verbose_Property_Definition_Found
}

export type Verbose_Property_Definition_Found =
    | ['yes', {
        'definition': d_schema.Group.D
        'value': _pi.Optional_Value<Value>
    }]
    | ['no', null]

export type Group_Verbose = {
    'properties': _pi.List<Verbose_Property>
}

export type List = {
    'definition': d_schema.Value.list
    'found value type':
    | ['valid', {
        'instance': d_astn_parse_tree.Value.type_.concrete.list
        'items': _pi.List<Value>
    }]
    | ['invalid', d_astn_parse_tree.Value]
}

export type Optional = {
    'definition': d_schema.Value.optional
    'found value type':
    | ['valid',
        | ['set', {
            'instance': d_astn_parse_tree.Value.type_.concrete.optional.set_
            'child value': Value
        }]
        | ['not set', {
            'instance':
            | ['nothing', d_astn_parse_tree.Value.type_.concrete.nothing]
            | ['null literal', d_astn_parse_tree.Value.type_.concrete.text]
        }]
    ]
    | ['invalid', d_astn_parse_tree.Value]
}

export type Reference = {
    'definition': d_schema.Value.reference
    'found value type':
    | ['valid', {
        'instance': d_astn_parse_tree.Value.type_.concrete.text
    }] //FIXME
    | ['invalid', d_astn_parse_tree.Value]
}

export type State = {
    'definition': d_schema.Value.state
    'found value type': State__found_value_type
}

export type Option_Status =
    | ['known', {
        'definition': d_schema.Value.state.options.D
        'value': Value
    }]
    | ['unknown', null]

export type State_Option =
    | ['set', {
        'option token': d_astn_parse_tree.Text
        'option': Option_Status
    }]
    | ['missing data', d_astn_parse_tree.Structural_Token]

export type Valid_State = {
    'definition': d_schema.Value.state
    'instance':
    | ['state', d_astn_parse_tree.Value.type_.concrete.state]
    | ['list', d_astn_parse_tree.Value.type_.concrete.list]
    'option': State_Option

}

export type State__found_value_type =
    | ['valid', Valid_State]
    | ['invalid', d_astn_parse_tree.Value]
    | ['list format error', {
        'list': d_astn_parse_tree.Value.type_.concrete.list
        'type':
        | ['missing option item', null]
        | ['option item is not a text', {
            'value': d_astn_parse_tree.Value
        }]
        | ['missing value item', null]
        | ['too many items', null]
    }
    ]

export type Nothing = {
    'definition': d_schema.Value.nothing
    'found value type':
    | ['valid', {
        'value':
        | ['nothing', d_astn_parse_tree.Value.type_.concrete.nothing]
        | ['null literal', d_astn_parse_tree.Value.type_.concrete.text]
    }]
    | ['invalid', d_astn_parse_tree.Value]
}

export type Text = {
    'definition': d_schema.Value.text
    'found value type':
    | ['valid', {
        'instance': d_astn_parse_tree.Value.type_.concrete.text
    }]
    | ['invalid', d_astn_parse_tree.Value]
}

export type Number = {
    'definition': d_schema.Value.number_
    'found value type':
    | ['valid', {
        'instance': d_astn_parse_tree.Value.type_.concrete.text
        'correct string type': boolean
    }]
    | ['invalid', d_astn_parse_tree.Value]
}

export type Entry_Data = {
    'id value pair': d_astn_parse_tree.ID_Value_Pairs.L
    'value': Optional_Value
}