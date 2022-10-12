import Button from "@mui/material/Button";
import * as React from "react";
import {useContext, useState} from "react";
import ProjectContext from "../../../contexts/ProjectContext";
import {projectService} from "../../../api";
import {Box, CircularProgress} from "@mui/material";

function ExportProject() {
    const {currentProject} = useContext(ProjectContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleExport = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
    };

    return (
        <Box sx={{ position: 'absolute', right: '100px' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                    variant="contained"
                    disabled={!currentProject.id || isLoading}
                    onClick={handleExport}
                >
                    EXPORT
                </Button>
                {isLoading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}

export default ExportProject;