import { useState, MouseEvent, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { IResource } from "../../interfaces/IResource";
import { Argument } from "./Argument";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import {IArgumentNodeData} from "../../interfaces/IArgumentNodeData";
import './index.css';

function ResourceNode(data: any) {
    const resource: IResource = data.data;
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClickOnNode = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseForm = () => {
        setAnchorEl(null);
    };

    const onArgumentUpdate = (argumentName: string, argumentValue: any) => {
        data.data.onArgumentUpdate(data.id, argumentName, argumentValue);
    }

    useEffect(() => {
        // update argument value to match default value when node is created
        resource.arguments.forEach((argument: IArgumentNodeData) => {
            if (argument.defaultValue != null) {
                onArgumentUpdate(argument.name, argument.defaultValue);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className={`react-flow__node-input ${data.selected ? 'selected': ''}`} style={{visibility: 'visible'}} onClick={handleClickOnNode}>
                <Handle type="target" position={Position.Top} />
                {resource.type}
                <Handle type="source" position={Position.Bottom} id="a" />
            </div>

            <Dialog open={open} onClose={handleCloseForm}>
                <DialogTitle>{resource.type}</DialogTitle>
                <DialogContent>
                    {resource.arguments.map((argument: IArgumentNodeData, index: number) => (
                        <Argument argument={argument} key={index} onArgumentUpdate={onArgumentUpdate} />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm}>Close</Button>
                </DialogActions>
            </Dialog>
        </>

    );
}

export default ResourceNode;
