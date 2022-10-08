import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import React, {useEffect} from 'react';
import {IResourceNodeData} from "../../interfaces/IResourceNodeData";
import {Node} from "react-flow-renderer";
import {ExpandMore} from "@mui/icons-material";
import {Dispatch, SetStateAction} from "react";
import {IArgumentNodeData} from "../../interfaces/IArgumentNodeData";

interface ResourceSideBarProps {
    nodes: Node<IResourceNodeData>[],
    setNodes: Dispatch<SetStateAction<Node<IResourceNodeData>[]>>,
}

function Index(props: ResourceSideBarProps) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    useEffect(() => {
        props.nodes.forEach((node: Node<IResourceNodeData>) => {
            // TODO: why are nodes rendered twice in a row each time there is a change ?
            if (node.selected === true) {
                setExpanded(node.id);
            }
        })
    }, [props.nodes])

    const handleAccordionChange =
        (nodeId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? nodeId : false);

            // select node unless accordion is flattened
            props.setNodes((nodes: Node<IResourceNodeData>[]) =>
                nodes.map((node: Node<IResourceNodeData>) => {
                    if (node.id === nodeId && isExpanded === true) {
                        node.selected = true;
                    } else {
                        node.selected = false;
                    }
                    return node;
                })
            );
        };

    return (
        <Paper elevation={4} style={{height: "100%"}}>
            <List>
                <ListItem>
                    <ListItemText primary={"Provider"} />
                </ListItem>
                <ListItem>
                    <ListItemText inset={true} primary={"AWS"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Resources"} />
                </ListItem>

                {props.nodes.map((node: Node<IResourceNodeData>, index: number) => (
                    <Accordion
                        key={index}
                        expanded={expanded === node.id}
                        onChange={handleAccordionChange(node.id)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Typography>{node.data.type}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {node.data.arguments.map((argument: IArgumentNodeData, index: number) => (
                                <div key={index}>
                                    <b>{argument.name}</b>: {argument.value != undefined ? argument.value.toString() : ''} <br/>
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>
        </Paper>
    )
}

export default Index;
