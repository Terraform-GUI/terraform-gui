import {Node} from 'react-flow-renderer';
import {INodeData} from "./INodeData";
import {ISavedProject} from "./ISavedProject";

export interface IProject extends ISavedProject {
    nodes: Node<INodeData>[]
}