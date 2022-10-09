/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import './index.css';
import { Node } from "react-flow-renderer";
import {INodeData} from "../../interfaces/INodeData";

interface ResourceSideBarProps {
  nodes: Node<INodeData>[],
}

const Description = (props: ResourceSideBarProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    props.nodes.forEach((node: Node<INodeData>) => {
      if (node.selected) {
        setExpanded(node.id);
      }
    })
  }, [props.nodes])

  return (
    <div className="description">
      {
        props.nodes.map((node: Node<INodeData>, index: number) => {
          if (node.id === expanded) {
            return (
              <div key={index}>
                <b style={{color:"orange"}}>{node.data.resource.description}</b>
              </div>
            )
          }
        })
      }
    </div>
  );
};

export default Description;
