/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import './index.css';
import { Node } from 'react-flow-renderer';
import { INodeData } from '../../interfaces/INodeData';
import { Typography } from '@mui/material';

interface ResourceSideBarProps {
  nodes: Node<INodeData>[];
}

const Description = (props: ResourceSideBarProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    props.nodes.forEach((node: Node<INodeData>) => {
      if (node.selected) {
        setExpanded(node.id);
      }
    });
  }, [props.nodes]);

  return (
    <>
      {props.nodes.map((node: Node<INodeData>, index: number) => {
        if (node.id === expanded) {
          return (
            <div key={index}>
              <Typography>
                <b>{node.data.resource.description}</b>
              </Typography>
            </div>
          );
        }
      })}
    </>
  );
};

export default Description;
