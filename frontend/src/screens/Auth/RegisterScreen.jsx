import { Formik, Form, Field } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "formik-mui";
import AuthService from "../../services/authService";
import { registerationValidation } from "../../validations/authValidations";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        to="https://github.com/usman-monir/MUI-based-task-manager-app.git"
      >
        Task Manager App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const RegisterScreen = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmission = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await AuthService.register(
        values.name,
        values.email,
        values.password
      );

      if (response?.success) {
        navigate("/login");
      } else {
        const errorMessage = response.message ? response.message : "Registration failed";
        setFieldError("general", errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setFieldError("general", "Something went wrong with the registration");
    }
    setSubmitting(false);
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
            Register
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={registerationValidation}
            onSubmit={handleSubmission}
          >
            {({ resetForm, isSubmitting, errors }) => (
              <Form>
                {errors?.general && (
                  <Alert severity="error">{errors?.general || 'Something went wrong'}</Alert>
                )}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="name"
                      type="text"
                      label="Name"
                      fullWidth
                      margin="normal"
                      autoComplete="given-name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      label="Email Address"
                      fullWidth
                      margin="normal"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      fullWidth
                      margin="normal"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      fullWidth
                      margin="normal"
                      autoComplete="confirm-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
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
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterScreen;
