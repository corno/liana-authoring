import * as _pi from 'pareto-core/dist/interface'

import * as resources from "./resources"
import * as resources_pareto from "pareto-resources/dist/interface/resources"

export namespace queries {

    export type get_schema = _pi.Query_Function<
        resources.queries.get_schema,
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
        }>

    export type get_schema_path = _pi.Query_Function<
        resources.queries.get_schema_path,
        {
            'stat': resources_pareto.filesystem_unrestricted.queries.stat_possible_node
        }>


    export type deserialize = _pi.Query_Function<
        resources.queries.deserialize,
        {
            'get schema': resources.queries.get_schema
            'get schema path': resources.queries.get_schema_path
        }>

    export type load_unmarshalled_file = _pi.Query_Function<
        resources.queries.load_unmarshalled_file,
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
            'stat': resources_pareto.filesystem_unrestricted.queries.stat_possible_node

        }>

}

export namespace commands {

    export type seal = _pi.Command_Procedure<
        resources_pareto.resources.commands.main,
        {
            'log error': resources_pareto.stream.commands.log_error
        },
        null
    >

}