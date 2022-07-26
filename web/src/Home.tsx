import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export const Home: FunctionComponent = () => {

  return(
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Link to="/login" style={{textDecoration: 'none'}}>
          <Button variant="contained" color="primary" >
            Login
          </Button>
        </Link>
        <Link to="/sign-up" style={{textDecoration: 'none'}}>
          <Button variant="contained" color="primary" >
            SignUp
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <h1>TerraformGUI</h1>
      </Grid>
    </Grid>
  )
} 

export default Home;