import {Dispatch, SetStateAction } from "react";
import Editor from "@monaco-editor/react";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";
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
