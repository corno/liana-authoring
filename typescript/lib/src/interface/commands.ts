import * as pci from 'pareto-core/dist/command_interface'

import * as resources from "./resources"
import * as resources_pareto from "pareto-resources/dist/interface/resources"
import * as resources_pareto_stream from "pareto-stream/dist/interface/commands"
import * as resources_common from "../modules/common_tool_signatures/interface/queries"

import * as d_serialize_prose from "pareto-fountain-pen/dist/interface/to_be_generated/prose_serialize"

export namespace commands {

    export type seal = pci.Command_Procedure<
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