import Button from "@mui/material/Button";
import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import {Project} from "../../../interfaces/Project";

interface SaveProjectProps {
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>
    project: Project,
    secondaryAction?: Function,
}

function SaveProject(props: SaveProjectProps) {
    const save = () => {
        props.setIsProjectSaved(true);
        // TODO save props.project through api
    };

    return (
        <>
            <Button variant="contained" onClick={() => {
                save();
                if (props.secondaryAction) props.secondaryAction();
            }}>SAVE</Button>
        </>
    )
}

export default SaveProject;