import {Dispatch, SetStateAction } from "react";
import Editor from "@monaco-editor/react";
import {Node} from "react-flow-renderer";
import {INodeData} from "../../interfaces/INodeData";

interface ResourceSideBarProps {
  nodes: Node<INodeData>[],
  setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>,
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
