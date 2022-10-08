
/**
 * A Terraform Resource as React Flow node data
 */
export interface ResourceNodeData {
    type: string
    label: string
    description: string
    arguments: Argument[],
    onArgumentUpdate?: (nodeId: string, argumentName: string, argumentValue: any) => void
}

export interface Argument {
    value: any|null,
    name: string
}