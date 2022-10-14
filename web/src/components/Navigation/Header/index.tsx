import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function isLogged() {
    return (
      !!localStorage.getItem('access_token') &&
      localStorage.getItem('access_token') != null
    );
  }

  function handleLogOut() {
    localStorage.clear();
    navigate('/home');
  }

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
          {!isLogged() && (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="outlined">Login</Button>
            </Link>
          )}
          {isLogged() && (
            <>
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => navigate('/profile')}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut}>
                  <LogoutIcon /> Log out
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Stack>
    </div>
  );
};
export default Header;
