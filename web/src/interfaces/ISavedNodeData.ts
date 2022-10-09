import {ISavedArgumentNodeData} from "./ISavedArgumentNodeData";

/**
 * A Terraform Resource stored inside a React Flow node that comes from API with missing data
 */
export interface ISavedNodeData {
    label: string
    resource: {
        type: string
        arguments: ISavedArgumentNodeData[]
        description: string
    }
}