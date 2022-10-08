import {ISavedArgumentNodeData} from "./ISavedArgumentNodeData";

/**
 * A Terraform Resource stored inside a React Flow node that comes from API with missing data
 */
export interface ISavedResourceNodeData {
    type: string,
    description: string
    arguments: ISavedArgumentNodeData[],
}