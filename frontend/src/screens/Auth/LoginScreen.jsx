import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../../services/authService";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" to="https://github.com/usman-monir/MUI-based-task-manager-app.git">
        Task Manager App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const LoginScreen = () => {

  const defaultState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    errorMessage: "",
  }
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultState);

  const handleEmailChange = (event) => {
    setFormData({...formData, email: event.target.value});

  };

  const handlePasswordChange = (event) => {
    setFormData({...formData, password: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = formData;
    let valid = true;

    if (!email) {
      setFormData({...formData, emailError:  "Email is required"});
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setFormData({...formData, emailError:  "Invalid email address!"});
      valid = false;
    }

    if (!password) {
      setFormData({...formData, passwordError:  "Password is required"});
      valid = false;
    }

    if(!valid) return;

    const response = AuthService.login(email, password);
    console.log(response);
    if (response?.success){
      localStorage.setItem("userInfo", JSON.stringify(response));
      navigate("/");
    }
    else{
      setFormData({...formData, errorMessage: response?.error || 'unexpected error'});
    }
  };

  const resetFormData = () => {
   setFormData(defaultState)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {formData.errorMessage && <Alert severity="error">{formData.errorMessage}</Alert>}
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleEmailChange}
              error={!!formData.emailError}
              helperText={formData.emailError}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handlePasswordChange}
              error={!!formData.passwordError}
              helperText={formData.passwordError}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={10}>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item xs={2}>
              <Button
                  onClick={resetFormData}
                  startIcon={<DeleteOutlinedIcon color="secondary" />}
                  fullWidth
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginScreen;
