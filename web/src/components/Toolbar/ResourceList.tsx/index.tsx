import React, {useContext} from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {IResource} from "../../../interfaces/IResource";
import ResourceNode from "../../ResourceNode";
import ResourcesContext from "../../../contexts/ResourcesContext";

const ResourceList = () => {

  const {resources} = useContext(ResourcesContext);

  const onDragStart = (event: any, nodeType: any, resource: IResource) => {

    event.dataTransfer.setData("application/reactflow", JSON.stringify({
      type: nodeType,
      resource: resource
    }));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <Stack direction="row" spacing={1}>
        {resources.map((resource: IResource, index: number) => (
            <div onDragStart={(event) => onDragStart(event, "ResourceNode", resource)} key={index} draggable>
              <Chip label={resource.type} variant="outlined" />
            </div>
        ))}
      </Stack>
    </aside>
  );
};

export default ResourceList;
