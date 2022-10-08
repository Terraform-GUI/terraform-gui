
/**
 * A Terraform Resource as React Flow node data
 */
export interface ResourceNodeData {
    type: string
    label: string
    arguments: Argument[]
}

export interface Argument {
    value: any|null,
    name: string
}