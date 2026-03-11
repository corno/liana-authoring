import * as _pi from 'pareto-core/dist/interface'

import * as resources from "./resources"
import * as resources_pareto from "pareto-resources/dist/interface/resources"

export namespace queries {

    export type get_unmarshalled_document = _pi.Query_Function<
        resources.queries.get_unmarshalled_document,
        {
            'read file': resources_pareto.queries.read_file
        }
    >

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