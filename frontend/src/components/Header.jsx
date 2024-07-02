import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const Header = () => {
    const navigate = useNavigate();

return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate('/')}>
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
