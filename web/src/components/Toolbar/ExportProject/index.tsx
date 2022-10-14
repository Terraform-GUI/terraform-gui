import * as React from 'react';
import { useContext, useState } from 'react';
import ProjectContext from '../../../contexts/ProjectContext';
import { projectService } from '../../../api';
import { LoadingButton } from '@mui/lab';

function ExportProject() {
  const { currentProject } = useContext(ProjectContext);
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
    };

    if (currentProject.id != null) {
      const data = await projectService.getArchive(currentProject.id);
      if (data) {
        download(data);
      }
    }
    setIsLoading(false);
  };

  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      disabled={!currentProject.id}
      onClick={handleExport}
    >
      Export
    </LoadingButton>
  );
}

export default ExportProject;
