import {Node} from 'react-flow-renderer';
import {IResourceNodeData} from "./IResourceNodeData";
import {ISavedProject} from "./ISavedProject";

export interface IProject extends ISavedProject {
    nodes: Node<IResourceNodeData>[]
}