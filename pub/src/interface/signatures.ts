import * as _pi from 'pareto-core/dist/interface'

import * as resources from "./resources"
import * as resources_pareto from "pareto-resources/dist/interface/resources"

export namespace queries {

    export type get_completion_suggestions = _pi.Query_Function<
        resources.queries.get_completion_suggestions,
        {
            'read file': resources_pareto.queries.read_file
        }
    >

    export type get_on_hover_info = _pi.Query_Function<
        resources.queries.get_on_hover_info,
        {
            'read file': resources_pareto.queries.read_file
        }
    >

    export type seal = _pi.Query_Function<
        resources.queries.seal,
        {
            'read file': resources_pareto.queries.read_file
        }
    >

    export type validate_document = _pi.Query_Function<
        resources.queries.validate_document,
        {
            'read file': resources_pareto.queries.read_file
        }
    >


}