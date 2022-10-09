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
        <Link to="/register" style={{textDecoration: 'none'}}>
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
