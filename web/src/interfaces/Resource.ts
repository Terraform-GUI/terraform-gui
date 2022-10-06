export interface Resource {
    provider: string,
    type: string,
    description: string,
    arguments: ResourceArgument[],
}


export interface ResourceArgument {
    type: 'string'|'select'|'bool'|'number',
    name: string,
    defaultValue: any,
    values: any[],
    min: string|null,
    max: string|null,
    value?: string|null
}