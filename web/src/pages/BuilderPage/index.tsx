import React, {useState} from 'react';

import SchemaUI from '../../components/SchemaUI';
import HeaderRessourceBar from '../../components/HeaderRessourceBar';
import Description from '../../components/Description';

function BuilderPage() {
  const [save, setSave] = useState(Boolean); 

  const isBoolean = (res : boolean) => {
    setSave(res)
    console.log(res)
  }

  return (
    <div className="wrapper">
      <div className="ressourceSideBar">Ressource side bar</div>
      <div className="header">
        <HeaderRessourceBar saves={isBoolean}/>
      </div>
      <div className="schemaUI">
        <SchemaUI saves={save}/>
        </div>
      <div className="renderCode">Render Code</div>
      <div className="descriptions">
        <Description/>
        </div>
    </div>
  );
}

export default BuilderPage;