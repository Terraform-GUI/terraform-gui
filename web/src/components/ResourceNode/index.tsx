import { useState, MouseEvent, useEffect} from 'react';
import { Handle, Position } from 'react-flow-renderer';
import {ResourceArgument, Resource} from "../../interfaces/Resource";
import {Argument} from "../Argument";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import './index.css'

function ResourceNode(data:any) {
    const resource: Resource = data.data;
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
        resource.arguments.forEach((argument: ResourceArgument) => {
            if (argument.defaultValue != null) {
                onArgumentUpdate(argument.name, argument.defaultValue);
            }
        })
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
                    <DialogContentText>
                        {resource.description}
                    </DialogContentText>

                    {resource.arguments.map((argument: ResourceArgument, index: number) => (
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
