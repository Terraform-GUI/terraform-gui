/**
 * A Terraform resource
 */
export interface IResource {
    provider: string,
    type: string,
    description: string,
    arguments: IArgument[],
}

export interface IArgument {
    name: string,
    type: 'string' | 'select' | 'bool' | 'number',
    defaultValue: any,
    values: any[],
    min: string | null,
    max: string | null,
    value?: string | null
}