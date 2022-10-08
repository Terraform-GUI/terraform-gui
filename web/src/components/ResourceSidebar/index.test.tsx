import React from 'react';
import { render, screen } from '@testing-library/react';
import ResourceSideBar from "./index";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";

test('provider and resources are found and displayed in the sidebar', () => {
    const nodes: Node<ResourceNodeData>[] = [
        {
            id: '1',
            data: {
                type: 'RDS',
                label: (
                    "<>Welcome to <strong>React Flow!</strong></>"
                ),
                description: 'description',
                arguments: []
            },
            position: { x: 250, y: 0 },
        },
        {
            id: '1',
            data: {
                type: 'EC2',
                label: (
                    "<>Welcome to <strong>React Flow!</strong></>"
                ),
                description: 'description',
                arguments: []
            },
            position: { x: 250, y: 0 },
        },
    ];

    render(<ResourceSideBar nodes={nodes} setNodes={jest.fn()} />);

    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("RDS")).toBeInTheDocument();
    expect(screen.getByText("EC2")).toBeInTheDocument();
});