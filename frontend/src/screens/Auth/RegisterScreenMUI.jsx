import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from '../../services/authService';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://github.com/usman-monir/MUI-based-task-manager-app.git">
        Task Manager App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const RegisterScreen = () => {
  const navigate = useNavigate();

  const defaultState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    errorMessage: "",
  };

  const [formData, setFormData] = useState(defaultState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setFormData(defaultState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = formData;
    let valid = true;

    if (!name) {
      setFormData((prevState) => ({ ...prevState, nameError: 'Name is required' }));
      valid = false;
    }

    if (!email) {
      setFormData((prevState) => ({ ...prevState, emailError: 'Email is required' }));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setFormData((prevState) => ({ ...prevState, emailError: 'Invalid email address' }));
      valid = false;
    }

    if (!password) {
      setFormData((prevState) => ({ ...prevState, passwordError: 'Password is required' }));
      valid = false;
    }

    if (!confirmPassword) {
      setFormData((prevState) => ({ ...prevState, confirmPasswordError: 'Confirm Password is required' }));
      valid = false;
    }

    if (password !== confirmPassword) {
      setFormData((prevState) => ({ ...prevState, confirmPasswordError: 'Password mismatch!' }));
      valid = false;
    }

    if (!valid) return;

    const response = await AuthService.register(name, email, password);
    if (response.success) navigate('/login');
    else{
      setFormData({...formData, errorMessage: response.error});
    }
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {formData.errorMessage && <Alert severity="error">{formData.errorMessage}</Alert>}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  error={!!formData.nameError}
                  helperText={formData.nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  error={!!formData.emailError}
                  helperText={formData.emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!formData.passwordError}
                  helperText={formData.passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="confirm-password"
                  error={!!formData.confirmPasswordError}
                  helperText={formData.confirmPasswordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item xs={10}>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={resetForm}
                  startIcon={<DeleteOutlinedIcon color="secondary" />}
                  fullWidth
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterScreen;
