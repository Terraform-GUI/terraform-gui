// Transform data related to ReactFlow

import {Node} from "react-flow-renderer";
import {IResource} from "../interfaces/IResource";
import {
    IResourceNodeData
} from "../interfaces/IResourceNodeData";
import {ISavedArgumentNodeData} from "../interfaces/ISavedArgumentNodeData";
import {ISavedResourceNodeData} from "../interfaces/ISavedResourceNodeData";
import {IArgumentNodeData} from "../interfaces/IArgumentNodeData";

/**
 *
 * Remove the data we don't want to save in database
 *
 * @param nodes
 */
export function setUpNodesForSave(nodes: Node<IResourceNodeData>[]): Node<ISavedResourceNodeData>[]
{
    // lose reference of nodes variable
    const updatedNodes: Node<IResourceNodeData>[] = JSON.parse(JSON.stringify(nodes));

    updatedNodes.forEach((node: Node<IResourceNodeData>) => {
        node.data.arguments.forEach((argument: any) => {
            argument.defaultValue = undefined;
            argument.values = undefined;
            argument.min = undefined;
            argument.max = undefined;
            argument.type = undefined;
        });
    });

    return updatedNodes;
}

/**
 * Merge react flow nodes with data in provider resources
 *
 * @param nodes
 * @param resources
 */
export function mergeNodesWithResource(
    nodes: Node<ISavedResourceNodeData>[],
    resources: IResource[],
    onArgumentUpdate: (nodeId: string, argumentName: string, argumentValue: any) => void): Node<IResourceNodeData>[]
{
    const mergedNodes: Node<IResourceNodeData>[] = [];

    nodes.forEach((node: Node<ISavedResourceNodeData>) => {
        resources.map((resource: any) => {
            if (resource.type === node.data.type) {
                const mergedNode: Node<IResourceNodeData> = {
                    ...node,
                    data: {
                        label: resource.type,
                        type: resource.type,
                        description: resource.description,
                        onArgumentUpdate: onArgumentUpdate,
                        arguments: []
                    }
                };
                node.data.arguments.forEach((argumentToUpdate: ISavedArgumentNodeData) => {
                    resource.arguments.forEach((argument: IArgumentNodeData) => {
                        if (argument.name === argumentToUpdate.name) {
                            mergedNode.data.arguments.push(argument);
                        }
                    });
                });
                mergedNodes.push(mergedNode);
            }
        })
    });

    return mergedNodes;
}