// Transform data related to ReactFlow

import {Node} from "react-flow-renderer";
import {IResource} from "../interfaces/IResource";
import {
    INodeData
} from "../interfaces/INodeData";
import {ISavedArgumentNodeData} from "../interfaces/ISavedArgumentNodeData";
import {ISavedNodeData} from "../interfaces/ISavedNodeData";
import {IArgumentNodeData} from "../interfaces/IArgumentNodeData";

/**
 *
 * Remove the data we don't want to save in database
 *
 * @param nodes
 */
export function setUpNodesForSave(nodes: Node<INodeData>[]): Node<ISavedNodeData>[]
{
    // lose reference of nodes variable
    const updatedNodes: Node<ISavedNodeData>[] = [];

    nodes.map((node: Node<INodeData>) => {
        const updatedNode: Node<ISavedNodeData> = {
            id: node.id,
            position: node.position,
            data: {
                label: node.data.label,
                resource: {
                    type: node.data.resource.type,
                    description: node.data.resource.description,
                    arguments: []
                }
            }
        }

        node.data.resource.arguments.forEach((argument: any) => {
            updatedNode.data.resource.arguments.push({
                name: argument.name,
                value: argument.value
            })
        });

        updatedNodes.push(updatedNode);
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
    nodes: Node<ISavedNodeData>[],
    resources: IResource[],
    onArgumentUpdate: (nodeId: string, argumentName: string, argumentValue: any) => void): Node<INodeData>[]
{
    const mergedNodes: Node<INodeData>[] = [];

    nodes.forEach((node: Node<ISavedNodeData>) => {
        resources.map((resource: IResource) => {
            if (resource.type === node.data.resource.type) {
                const mergedNode: Node<INodeData> = {
                    ...node,
                    type: 'ResourceNode',
                    data: {
                        label: resource.type,
                        onArgumentUpdate: onArgumentUpdate,
                        resource: {
                            type: resource.type,
                            description: resource.description,
                            arguments: []
                        }
                    }
                };
                node.data.resource.arguments.forEach((argumentToUpdate: ISavedArgumentNodeData) => {
                    resource.arguments.forEach((argument: IArgumentNodeData) => {
                        if (argument.name === argumentToUpdate.name) {
                            mergedNode.data.resource.arguments.push(argument);
                        }
                    });
                });
                mergedNodes.push(mergedNode);
            }
        })
    });

    return mergedNodes;
}