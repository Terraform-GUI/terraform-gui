import {Node} from "react-flow-renderer";
import {ISavedResourceNodeData} from "./ISavedResourceNodeData";

/**
 * A Project that comes from API with missing data
 */
export interface ISavedProject {
    id: string | null,
    name: string
    nodes: Node<ISavedResourceNodeData>[]
}