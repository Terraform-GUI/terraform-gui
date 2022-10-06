import React, {useEffect, useState} from 'react';

import SchemaUI from '../../components/SchemaUI';
import Toolbar from '../../components/Toolbar';
import Description from '../../components/Description';
import {useNodesState} from "react-flow-renderer";
import ResourceSidebar from "../../components/ResourceSidebar";
import {Project} from "../../interfaces/Project";
import {ProjectProvider} from "../../contexts/ProjectContext";
import CodeEditor from "../../components/CodeEditor";
import "./index.css"

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

function HomePage() {


  return (
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
  );
}

export default HomePage;
