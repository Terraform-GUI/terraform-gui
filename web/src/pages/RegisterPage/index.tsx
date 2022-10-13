import React, { FunctionComponent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { userService } from '../../api';
import BaseLayout from '../../components/Layout/BaseLayout';
import { Alert, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Register: FunctionComponent = () => {
  const [error, setError] = useState('');
  const [mailSent, setMailSent] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      emailInput: { value: string };
      passwordInput: { value: string };
      confirmInput: { value: string };
    };
    const email = formElements.emailInput.value;
    const password = formElements.passwordInput.value;
    const confirm = formElements.confirmInput.value;

    setError('');
    !passwordIsValid(password) &&
      setError(
        'Password should be at least 8 characters long and contain at least one number'
      );
    !passwordsMatch(password, confirm) && setError('Passwords do not match');
    !emailIsValid(email) && setError('Email is not valid');
    if (error !== '') {
      return;
    }
    const register = await userService.register(email, password, confirm);
    if (register?.success) {
      setMailSent(true);
    }
  }

  function emailIsValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function passwordIsValid(password: string) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }

  function passwordsMatch(password: string, confirm: string) {
    return password === confirm;
  }

  async function githubLogin() {
    let login = await userService.githubLogin();
    //replace 8000 with 3000
    if (login !== undefined) {
      window.location.href = login.url;
    }
  }

  return (
    <BaseLayout>
      <Container maxWidth="xs">
        <Typography textAlign="center" mt={5} variant="h4">
          Create your account
        </Typography>
        <Typography textAlign="center" variant="subtitle2" mt={2} mb={5}>
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
        <>
          <form onSubmit={handleSubmit}>
            <Stack
              pb={3}
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {mailSent && (
                <Alert severity="success">
                  An mail has been sent to your email address. Please click on
                  the link to validate your account.
                </Alert>
              )}
              <TextField
                required
                fullWidth
                id="emailInput"
                label="Email"
                variant="outlined"
                placeholder="john.doe@gmail.com"
              />
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                id="passwordInput"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                type="password"
                id="confirmInput"
                variant="outlined"
                label="Password confirmation"
              />
              <Button fullWidth size="large" type="submit" variant="contained">
                Continue
              </Button>
            </Stack>
          </form>
          <div>{error}</div>

          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={githubLogin}
            startIcon={<GitHubIcon />}
          >
            Continue with Github
          </Button>
        </>
      </Container>
    </BaseLayout>
  );
};

export default Register;
