import Button from "@mui/material/Button";
import * as React from "react";
import {useContext} from "react";
import ProjectContext from "../../../contexts/ProjectContext";

interface SaveProjectProps {
    secondaryAction?: Function,
}

function SaveProject(props: SaveProjectProps) {
    const {setIsProjectSaved} = useContext(ProjectContext);

    const save = () => {
        setIsProjectSaved(true);
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