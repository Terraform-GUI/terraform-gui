// Transform data related to ReactFlow

import {Node} from "react-flow-renderer";
import {Resource} from "../interfaces/Resource";

/**
 *
 * Remove the data we don't want to save in database
 *
 * @param nodes
 */
export function setUpNodesForSave(nodes: Node[]): Node[]
{
    // lose reference of nodes variable
    const updatedNodes = JSON.parse(JSON.stringify(nodes));

    updatedNodes.forEach((node: Node) => {
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
 * Merge react flow nodes with data in provider resources, mostly arguments
 *
 * @param nodes
 * @param resources
 */
export function mergeNodesWithResource(
    nodes: Node[],
    resources: Resource[],
    onArgumentUpdate: (nodeId: string, argumentName: string, argumentValue: any) => void): Node[]
{
    nodes.forEach((node: Node) => {
        resources.map((resource: any) => {
            if (resource.type === node.data.type) {
                node.data.onArgumentUpdate = onArgumentUpdate;
                node.data.arguments.forEach((argumentToUpdate: any) => {
                    resource.arguments.forEach((argument: any) => {
                        if (argument.name === argumentToUpdate.name) {
                            argumentToUpdate.type = argument.type;
                            argumentToUpdate.defaultValue = argument.defaultValue;
                            argumentToUpdate.values = argument.values;
                            argumentToUpdate.min = argument.min;
                            argumentToUpdate.max = argument.max;
                        }
                    });
                });
            }
        })
    });

    return nodes;
}