import {TextField} from "@mui/material";
import {Project} from "../../../interfaces/Project";
import React, {useState} from "react";

interface CurrentProjectProps {
    project: Project
}

function CurrentProject(props: CurrentProjectProps) {
    const [projectName, setProjectName] = useState(props.project.name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
        props.project.name = event.target.value;
    };

    return (
        <>
            <TextField
                id="standard-basic"
                label="Current project"
                variant="standard"
                value={props.project.name}
                onChange={handleChange}
            />
        </>
    )
}

export default CurrentProject;