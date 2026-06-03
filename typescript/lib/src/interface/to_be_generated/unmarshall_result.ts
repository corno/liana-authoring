import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Range_Stack = {
    'range': d_location.Range
    'parent': _pi.Optional_Value<Range_Stack>
}

export type Document = {
    'header': _pi.Optional_Value<d_astn_parse_tree.Value>
    'content': Value
}

// export type Key_Value_Pair = {
//     'node': Node
// }

export type Property_Path = _pi.List<
    | ['group', string]
    | ['optional', null]
    | ['state', string]
>

export type Value = {
    'definition': d_schema.Value
    'instance': d_astn_parse_tree.Value
    'optional parent range stack': _pi.Optional_Value<Range_Stack>
    'property path': Property_Path
    'unmarshall result': Value_Unmarshall_Result //the type is determined by the definition
}

export type Value_Unmarshall_Result =
    | ['success', Unmarshalled_Value]
    | ['error', Value_Unmarshall_Error
    ]

export type Value_Unmarshall_Error =
    | ['incorrect',
        | ['wrong type', null]
        | ['list as state format error', {
            'list': d_astn_parse_tree.Value.type_.concrete.list
            'type':
            | ['missing option item', null]
            | ['option item is not a text', {
                'value': d_astn_parse_tree.Value
            }]
            | ['missing value item', null]
            | ['too many items', null]
        }]
        | ['unknown option', {
            'option token': d_astn_parse_tree.Text
            'definition': d_schema.Value.state
        }]
    ]
    | ['missing', null]

export type Unmarshalled_Value =
    | ['component', Component]
    | ['dictionary', Dictionary]
    | ['group', Group]
    | ['list', List]
    | ['nothing', Nothing]
    | ['simple', Simple]
    | ['optional', Optional]
    | ['reference', Reference]
    | ['state', State]
    | ['text', Text]

export type Component = {
    'definition': d_schema.Value.component
    'value': Value
}

export type Dictionary = {
    'definition': d_schema.Value.dictionary
    'intermediate': {
        'instance': d_astn_parse_tree.Value.type_.concrete.dictionary
        'entries as list': _pi.List<Entry>
    }
    'derived': {
        'entries': _pi.Dictionary<{
            'result': Entry_Unmarshall_Result
        }>
    }
}

export type Entry_Unmarshall_Result =
    | ['error', Entry_Unmarshall_Error]
    | ['success', Entry]

export type Entry_Unmarshall_Error =
    | ['duplicate', {
        'instances': _pi.List<Entry>
    }]

export type Group = {
    'definition': d_schema.Value.group
    'intermediate': {
        'instance':
        | ['group', {
            'dummy': null
            'type': Group_Type
        }]
        | ['dictionary', {
            'dummy': null
            'properties': Verbose_Properties
        }]
        | ['list', {
            'dummy': null
            'properties': Concise_Properties
        }]
    }
    'derived': {
        'style': Group_Type
        'properties': _pi.Dictionary<Property>
    }
}

export type Property = {
    'definition': d_schema.Group.D
    'result':
    | ['error', Property_Unmarshall_Error]
    | ['success', Value]
}

export type Property_Unmarshall_Error =
    | ['multiple', {
        'instances': Verbose_Properties
    }]
    | ['missing', {
        'start token range': d_location.Range
    }]

export type Group_Type =
    | ['verbose', Group_Verbose]
    | ['concise', Group_Concise]

export type Verbose_Properties = _pi.List<Verbose_Property>

export type Group_Concise = {
    'properties': Concise_Properties
}

export type Concise_Properties = _pi.List<Concise_Property>

export type Concise_Property = {
    'item': d_astn_parse_tree.Items.L
    'definition found': Concise_Property_Definition_Found
    'parent range stack': Range_Stack
}

export type Concise_Property_Definition_Found =
    | ['yes', Concise_Property_Definition_Found__yes]
    | ['no', {
        'item': d_astn_parse_tree.Items.L
    }]

export type Concise_Property_Definition_Found__yes = {
    'definition': d_schema.Group.D
    'id': string,
    'value': Value
}

export type Verbose_Property = {
    'id': string
    'definition found': Verbose_Property_Definition_Found
    'parent range stack': Range_Stack
    'intermediate': {
        'id value pair': d_astn_parse_tree.ID_Value_Pairs.L
    }
}

export type Verbose_Property_Definition_Found =
    | ['yes', {
        'definition': d_schema.Group.D
        'value': _pi.Optional_Value<Value>
    }]
    | ['no', null]

export type Group_Verbose = {
    'properties': Verbose_Properties
}

export type List = {
    'definition': d_schema.Value.list
    'instance': d_astn_parse_tree.Value.type_.concrete.list
    'derived': {
        'items': _pi.List<Value>
    }
}

export type Optional_Instance =
    | ['optional', Optional_Instance_Optional]
    | ['list', {
        'xxx': d_astn_parse_tree.Value.type_.concrete.list
        'child value': Value
    }]
    | ['null literal', d_astn_parse_tree.Value.type_.concrete.text]

export type Optional_Instance_Optional =
    | ['set', {
        'xxx': d_astn_parse_tree.Value.type_.concrete.optional.set_
        'child value': Value
    }]
    | ['not set', d_astn_parse_tree.Value.type_.concrete.optional.not_set]

export type Optional = {
    'definition': d_schema.Value.optional
    'instance': Optional_Instance
    'derived': {
        'status':
        | ['set', {
            'child value': Value
        }]
        | ['not set', null]
    }
}

export type Reference_Derived = {
    'definition': d_schema.Value.reference.type_.derived
    'intermediate': {
        'instance':
        | ['nothing', d_astn_parse_tree.Value.type_.concrete.nothing]
        | ['null literal', d_astn_parse_tree.Value.type_.concrete.text]
    }
}

export type Reference_Selected = {
    'definition': d_schema.Value.reference.type_.selected
    'intermediate': {
        'instance': d_astn_parse_tree.Value.type_.concrete.text
    }
}

export type Reference = {
    'type':
    ['derived', Reference_Derived]
    | ['selected', Reference_Selected]

}

export type State = {
    'definition': d_schema.Value.state
    'property pathx': Property_Path
    'parent range stack': Range_Stack
    'intermediate': {
        'instance':
        | ['state', {
            'xxx': d_astn_parse_tree.Value.type_.concrete.state
            'option status': State_Option

        }]
        | ['list', {
            'xxx': d_astn_parse_tree.Value.type_.concrete.list
            'option status': State_Option
        }]
    }
    'derived': {
        'option status': State_Option
    }
}

export type State_Option =
    | ['set', State_Set]
    | ['missing data', {
        'intermediate': d_astn_parse_tree.Structural_Token
    }]

export type State_Set = {
    'definition': d_schema.Value.state.options.D
    'intermediate': {
        'option token': d_astn_parse_tree.Text
    }
    'option': string
    'value': Value
}

export type Nothing = {
    'definition': d_schema.Value.nothing
    'instance':
    | ['nothing', d_astn_parse_tree.Value.type_.concrete.nothing]
    | ['null literal', d_astn_parse_tree.Value.type_.concrete.text]
}

export type Text = {
    'definition': d_schema.Value.text
    'instance': d_astn_parse_tree.Value.type_.concrete.text
}

export type Simple = {
    'definition': d_schema.Value.simple
    'instance': d_astn_parse_tree.Value.type_.concrete.text
}

export type Entry = {
    'parent range stack': Range_Stack
    'property path': Property_Path
    'definition': d_schema.Dictionary
    'intermediate': {
        'id value pair': d_astn_parse_tree.ID_Value_Pairs.L
    }
    'id': string
    'value': 
    | ['set', Value]
    | ['not set', null]
}