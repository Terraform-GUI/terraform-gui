import {Node} from 'react-flow-renderer';
import {ResourceNodeData} from "./ResourceNodeData";

export interface Project {
    id: string|null,
    name: string
    nodes: Node<ResourceNodeData>[]
}