import {Dispatch, SetStateAction } from "react";
import Editor from "@monaco-editor/react";
import {IResourceNodeData} from "../../interfaces/IResourceNodeData";
import {Node} from "react-flow-renderer";

interface ResourceSideBarProps {
  nodes: Node<IResourceNodeData>[],
  setNodes: Dispatch<SetStateAction<Node<IResourceNodeData>[]>>,
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
