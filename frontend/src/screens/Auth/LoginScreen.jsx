import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from 'formik-mui';
import AuthService from '../../services/authService';

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
  const navigate = useNavigate();

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
            Sign in
          </Typography>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Email is required'),
              password: Yup.string().required('Password is required'),
            })}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                const response = await AuthService.login(values.email, values.password);
                if (response?.success) {
                  localStorage.setItem('userInfo', JSON.stringify(response));
                  navigate('/');
                }
              } catch (error) {
                setFieldError('general', error.message || 'Failed to login');
              }
              setSubmitting(false);
            }}
          >
            {({ submitForm, resetForm, isSubmitting, errors }) => (
              <Form>
                {errors.general && <Alert severity="error">{errors.general}</Alert>}
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  autoFocus
                />
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
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
                      type="button"
                      onClick={resetForm}
                      startIcon={<DeleteOutlinedIcon color="secondary" />}
                      fullWidth
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginScreen;
