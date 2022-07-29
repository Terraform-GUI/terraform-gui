import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import RessourceList from "./ressourceList";


const Header = ({ saves }: any) => {

  const save = () => {
    saves(true);
  };

  return (
    <div>
      <AppBar style={{ backgroundColor: "#CED8F7" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
                <RessourceList /> 
              <Button onClick={() => save()}>SAVE</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default Header;
