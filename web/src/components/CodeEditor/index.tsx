import {useContext} from "react";
import Editor from "@monaco-editor/react";
import ProjectContext from "../../contexts/ProjectContext";

const CodeEditor = () => {

    const {currentProject} = useContext(ProjectContext);

        return (
        <div style={{backgroundColor : "black"}}>
            <Editor
                height="95vh"
                defaultLanguage="hcl"
                value={currentProject.hcl}
                theme="vs-dark"
            />
        </div>
    );
};

export default CodeEditor;
