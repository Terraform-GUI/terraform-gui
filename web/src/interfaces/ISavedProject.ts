import {Edge, Node} from "react-flow-renderer";
import {ISavedNodeData} from "./ISavedNodeData";

/**
 * A Project that comes from API with missing data
 */
export interface ISavedProject {
    id: string | null
    name: string
    nodes: Node<ISavedNodeData>[]
    edges: Edge[]
}