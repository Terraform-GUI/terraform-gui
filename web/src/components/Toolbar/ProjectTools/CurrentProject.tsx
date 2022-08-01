import {TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import ProjectContext from "../../../contexts/ProjectContext";

function CurrentProject() {
    const {currentProject, setIsProjectSaved} = useContext(ProjectContext);
    const [projectName, setProjectName] = useState<string>(currentProject.name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
        setIsProjectSaved(false);
        currentProject.name = event.target.value;
    };

    return (
        <>
            <TextField
                id="standard-basic"
                label="Current project"
                variant="standard"
                value={currentProject.name}
                onChange={handleChange}
            />
        </>
    )
}

export default CurrentProject;