import * as _pi from 'pareto-core/dist/interface'

import * as resources from "./resources"
import * as resources_pareto from "pareto-resources/dist/interface/resources"

export namespace queries {

    export type get_schema_path = _pi.Query_Function<
        resources.queries.get_schema_path,
        {
            'stat': resources_pareto.queries.stat
        }>


    export type deserialize = _pi.Query_Function<
        resources.queries.deserialize,
        {
            'get schema': resources.queries.get_schema
            'get schema path': resources.queries.get_schema_path
        }>

    export type get_unmarshalled_file = _pi.Query_Function<
        resources.queries.get_unmarshalled_file,
        {
            'read file': resources_pareto.queries.read_file
        }>

}

export namespace commands {

    export type seal = _pi.Command_Procedure<
        resources_pareto.commands.main,
        {
            'log error': resources_pareto.commands.log_error
        },
        null
    >

}