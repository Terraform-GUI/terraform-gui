import Button from "@mui/material/Button";
import * as React from "react";
import {useContext} from "react";
import ProjectContext from "../../../contexts/ProjectContext";
import {projectService} from "../../../api";

function ExportProject() {
    const {currentProject} = useContext(ProjectContext);

    const handleExport = async () => {
        const download = (data: BlobPart) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${currentProject.name}.tf.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }

        if (currentProject.id != null) {
            const data = await projectService.getArchive(currentProject.id);
            if (data) {
                download(data);
            }
        }
    };

    return (
        <>
            <Button style={{ position: "absolute", right: "100px" }} variant="contained" onClick={handleExport} disabled={!currentProject.id}>EXPORT</Button>
        </>
    )
}

export default ExportProject;