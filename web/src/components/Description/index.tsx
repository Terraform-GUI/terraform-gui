/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import './index.css';
import { ResourceNodeData } from "../../interfaces/ResourceNodeData";
import { Node } from "react-flow-renderer";

interface ResourceSideBarProps {
  nodes: Node<ResourceNodeData>[],
}

const Description = (props: ResourceSideBarProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    props.nodes.forEach((node: Node<ResourceNodeData>) => {
      if (node.selected) {
        setExpanded(node.id);
      }
    })
  }, [props.nodes])

  return (
    <div className="description">
      {
        props.nodes.map((node: Node<ResourceNodeData>, index: number) => {
          if (node.id === expanded) {
            return (
              <div key={index}>
                <b style={{color:"orange"}}>{node.data.description}</b>
              </div>
            )
          }
        })
      }
    </div>
  );
};

export default Description;
