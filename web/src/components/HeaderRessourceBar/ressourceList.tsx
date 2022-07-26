import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const RessourceList = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleClicks = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <aside>
      <Stack direction="row" spacing={1}>
        <div onDragStart={(event) => onDragStart(event, "RDS")} draggable>
          <Chip label="RDS" variant="outlined" onClick={handleClicks} />
        </div>
        <div onDragStart={(event) => onDragStart(event, "EC2")} draggable>
          <Chip label="EC2" variant="outlined" onClick={handleClicks} />
        </div>
        <div onDragStart={(event) => onDragStart(event, "SQS")} draggable>
          <Chip label="SQS" variant="outlined" onClick={handleClicks} />
        </div>
        <div onDragStart={(event) => onDragStart(event, "Lambda")} draggable>
          <Chip label="Lambda" variant="outlined" onClick={handleClicks} />
        </div>
        <div onDragStart={(event) => onDragStart(event, "VPC")} draggable>
          <Chip label="VPC" variant="outlined" onClick={handleClicks} />
        </div>
        <div onDragStart={(event) => onDragStart(event, "secretManager")} draggable>
          <Chip label="secretManager" variant="outlined" onClick={handleClicks} />
        </div>
      </Stack>
    </aside>
  );
};

export default RessourceList;
