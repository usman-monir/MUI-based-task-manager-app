import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const Header = () => {
    const navigate = useNavigate();

return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager App
          </Typography>
          <Button color="inherit" onClick={() => (navigate('/register'))}>Create A New Account</Button>
          <Button color="warning" onClick={async () => {await AuthService.logout(); navigate('/login')} }>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
