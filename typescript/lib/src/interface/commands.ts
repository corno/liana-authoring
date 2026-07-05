import * as p_ from 'pareto-core/interface/command'

import * as resources_pareto from "pareto-resources/interface/resources"
import * as resources_pareto_stream from "pareto-stream/interface/commands"

import * as d_serialize_prose from "pareto-fountain-pen/interface/data/prose_serialize"

export namespace procedures {

    export type seal = p_.Command_Procedure<
        resources_pareto.resources.commands.main,
        {
            'tab size': number,
            'serialization parameters': d_serialize_prose.Parameters,
        },
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
            'stat': resources_pareto.filesystem_unrestricted.queries.stat_possible_node
        },
        {
            'write file': resources_pareto.filesystem_unrestricted.commands.write_file,
            'log error': resources_pareto_stream.commands.log_error,
        }
    >

}