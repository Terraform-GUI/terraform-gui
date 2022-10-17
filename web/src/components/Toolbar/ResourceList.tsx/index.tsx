import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import { IResource } from '../../../interfaces/IResource';
import ResourcesContext from '../../../contexts/ResourcesContext';
import Button from '@mui/material/Button';

const ResourceList = () => {
  const { resources } = useContext(ResourcesContext);

  const onDragStart = (event: any, nodeType: any, resource: IResource) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({
        type: nodeType,
        resource: resource,
      })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <Stack direction="row" spacing={1} alignItems="center">
        {resources.map((resource: IResource, index: number) => (
          <div
            onDragStart={(event) =>
              onDragStart(event, 'ResourceNode', resource)
            }
            key={index}
            draggable
          >
            <Button variant="text">{resource.type}</Button>
          </div>
        ))}
      </Stack>
    </aside>
  );
};

export default ResourceList;
