import {ISavedResourceNodeData} from "./ISavedResourceNodeData";
import {IArgumentNodeData} from "./IArgumentNodeData";

/**
 * A Terraform Resource as React Flow node data
 */
export interface IResourceNodeData extends ISavedResourceNodeData {
    label: string
    arguments: IArgumentNodeData[],
    onArgumentUpdate?: (nodeId: string, argumentName: string, argumentValue: any) => void
}