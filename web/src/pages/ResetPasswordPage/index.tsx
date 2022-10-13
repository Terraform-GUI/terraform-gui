import React, { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { userService } from '../../api';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BaseLayout from '../../components/Layout/BaseLayout';
import { Button, Container, Stack, Typography } from '@mui/material';

export const ResetPassword: FunctionComponent = () => {
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const fetchToken = searchParams.get('token');
    if (fetchToken) {
      const form = event.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        passwordInput: { value: string };
        confirmInput: { value: string };
      };
      const password = formElements.passwordInput.value;
      const confirm = formElements.confirmInput.value;

      setError('');
      !passwordIsValid(password) &&
        setError(
          'Password should be at least 8 characters long and contain at least one number'
        );
      !passwordsMatch(password, confirm) && setError('Passwords do not match');
      if (error !== '') {
        return;
      }
      const resetPassword = await userService.resetPassword(
        fetchToken,
        password,
        confirm
      );
      if (resetPassword?.success) {
        navigate('/login');
      }
    } else {
      navigate('/home');
    }
  }

  function passwordIsValid(password: string) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }

  function passwordsMatch(password: string, confirm: string) {
    return password === confirm;
  }

  return (
    <BaseLayout>
      <Container maxWidth="xs">
        <Typography textAlign="center" mt={5} mb={5} variant="h4">
          Reset your password
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
              required
              fullWidth
              type="password"
              variant="outlined"
              id="passwordInput"
              label="New password"
            />
            <TextField
              required
              fullWidth
              type="password"
              id="confirmInput"
              variant="outlined"
              label="New password confirmation"
            />
            <Button fullWidth size="large" type="submit" variant="contained">
              Continue
            </Button>
          </Stack>
        </form>
        <div>{error}</div>
      </Container>
    </BaseLayout>
  );
};

export default ResetPassword;
