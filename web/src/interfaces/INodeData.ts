import {ISavedNodeData} from "./ISavedNodeData";
import {IArgumentNodeData} from "./IArgumentNodeData";

/**
 * A Terraform Resource as React Flow node data
 */
export interface INodeData extends ISavedNodeData {
    label: string
    onArgumentUpdate?: (nodeId: string, argumentName: string, argumentValue: any) => void
    resource: {
        type: string
        arguments: IArgumentNodeData[],
        description: string
    }
}