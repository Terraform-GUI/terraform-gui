import React, { useState, useRef, useCallback, Dispatch, SetStateAction, useEffect } from "react";
import Editor, {useMonaco} from "@monaco-editor/react";
import {ResourceNodeData, Argument} from "../../interfaces/ResourceNodeData";
import {Node} from "react-flow-renderer";

interface ResourceSideBarProps {
  nodes: Node<ResourceNodeData>[],
  setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
}

const CodeEditor = (props: ResourceSideBarProps) => {

  return (
    <div style={{backgroundColor : "black"}}>
      <Editor
        height="95vh"
        defaultLanguage="javascript"
        value={JSON.stringify(props.nodes, undefined, 4)}
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeEditor;
