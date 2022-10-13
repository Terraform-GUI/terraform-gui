import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const Header = () => {
  return (
    <div>
      <Stack
        m={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography color="black">
          <Link to="/home" style={{ textDecoration: 'none' }}>
            Terraform GUI
          </Link>
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Login</Button>
          </Link>
        </Stack>
      </Stack>
    </div>
  );
};
export default Header;
