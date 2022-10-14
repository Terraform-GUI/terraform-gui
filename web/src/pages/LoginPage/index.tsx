import React, { FunctionComponent, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { userService } from '../../api';
import UserContext from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import BaseLayout from '../../components/Layout/BaseLayout';
import { Container, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Login: FunctionComponent = () => {
  const {
    email,
    setEmail,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  } = useContext(UserContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      emailInput: { value: string };
      passwordInput: { value: string };
    };
    const email = formElements.emailInput.value;
    const password = formElements.passwordInput.value;

    setError('');
    !emailIsValid(email) && setError('Email is not valid');
    if (error !== '') {
      return;
    }

    const login = await userService.login(email, password);
    if (login?.token) {
      localStorage.setItem('access_token', login.token);
      setEmail(email);
      setAccessToken(login.token);
      setRefreshToken(login.refresh_token);
      localStorage.setItem('access_token', login.token);
      localStorage.setItem('refresh_token', login.refresh_token);
      navigate('/');
    }
  }

  function emailIsValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      <div className="login">
        <Container maxWidth="xs">
          <Typography textAlign="center" mt={5} variant="h4">
            Welcome back
          </Typography>
          <Typography textAlign="center" variant="subtitle2" mt={2} mb={5}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack
              pb={3}
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                fullWidth
                required
                label="Email"
                id="emailInput"
                variant="outlined"
                autoComplete="username"
                placeholder="john.doe@gmail.com"
              />
              <TextField
                fullWidth
                required
                id="passwordInput"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />
              <Typography alignSelf="flex-end" variant="subtitle2">
                <Link to="/forgot-password">Forgot password?</Link>
              </Typography>
              <Button type="submit" variant="contained" fullWidth size="large">
                Continue
              </Button>
            </Stack>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              onClick={githubLogin}
              startIcon={<GitHubIcon />}
            >
              Continue with Github
            </Button>
          </form>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Login;
