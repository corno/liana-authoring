import * as _pi from 'pareto-core/dist/interface'

import * as resources_pareto from "pareto-resources/dist/interface/resources"

export namespace queries {

}

export namespace commands {

    export type transform_file = _pi.Command_Procedure<
        resources_pareto.resources.commands.main,
        {
            'write file': resources_pareto.filesystem_unrestricted.commands.write_file,
            'log error': resources_pareto.stream.commands.log_error,
        },
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
            'stat': resources_pareto.filesystem_unrestricted.queries.stat_possible_node
        }
    >

    export type stream_in_to_stream_out = _pi.Command_Procedure<
        resources_pareto.resources.commands.main,
        {
            'log error': resources_pareto.stream.commands.log_error
            'write to stdout': resources_pareto.stream.commands.write_to_stdout
        },
        {
            'get instream data': resources_pareto.stream.queries.get_instream_data,
        }
    >

}