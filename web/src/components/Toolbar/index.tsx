import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Index from "./ResourceList.tsx";


const Toolbar = ({ saves }: any) => {

  const save = () => {
    saves(true);
  };

  return (
    <div>
      <AppBar style={{ backgroundColor: "brown" }} position="static">
        <Container maxWidth="xl">
          <MuiToolbar disableGutters>
                <Index />
              <Button onClick={() => save()}>SAVE</Button>
          </MuiToolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default Toolbar;
