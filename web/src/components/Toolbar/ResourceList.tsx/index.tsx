import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ResourceList = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };


  return (
    <aside>
      <Stack direction="row" spacing={1}>
        <div onDragStart={(event) => onDragStart(event, "RDS")} draggable>
          <Chip label="RDS" variant="outlined" />
        </div>
        <div onDragStart={(event) => onDragStart(event, "EC2")} draggable>
          <Chip label="EC2" variant="outlined" />
        </div>
        <div onDragStart={(event) => onDragStart(event, "SQS")} draggable>
          <Chip label="SQS" variant="outlined" />
        </div>
        <div onDragStart={(event) => onDragStart(event, "Lambda")} draggable>
          <Chip label="Lambda" variant="outlined" />
        </div>
        <div onDragStart={(event) => onDragStart(event, "VPC")} draggable>
          <Chip label="VPC" variant="outlined" />
        </div>
        <div onDragStart={(event) => onDragStart(event, "secretManager")} draggable>
          <Chip label="secretManager" variant="outlined" />
        </div>
      </Stack>
    </aside>
  );
};

export default ResourceList;
