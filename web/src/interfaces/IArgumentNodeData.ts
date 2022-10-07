export interface IArgumentNodeData {
    name: string
    type: 'string' | 'select' | 'bool' | 'number',
    defaultValue: any,
    values: any[],
    min: string | null,
    max: string | null,
    value?: any | null
}