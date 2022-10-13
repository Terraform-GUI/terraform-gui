import React, { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { userService } from '../../api';
import BaseLayout from '../../components/Layout/BaseLayout';
import { Alert, Button, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
export const ForgotPassword: FunctionComponent = () => {
  const [error, setError] = useState('');
  const [mailSent, setMailSent] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      emailInput: { value: string };
    };
    const email = formElements.emailInput.value;

    setError('');
    !emailIsValid(email) && setError('Email is not valid');
    if (error !== '') {
      return;
    }

    const forgotPassword = await userService.forgotPassword(email);
    if (forgotPassword?.success) {
      setMailSent(true);
    }
  }

  function emailIsValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <BaseLayout>
      <Container maxWidth="xs">
        <Typography textAlign="center" mt={5} variant="h4">
          Reset your password
        </Typography>
        <Typography textAlign="center" mt={2} mb={5} variant="subtitle2">
          Enter your email address and we will send you instructions to reset
          your password.
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
                  An email has been sent to your email address with
                  instructions.
                </Alert>
              )}
              <TextField
                required
                fullWidth
                label="Email"
                id="emailInput"
                placeholder="john.doe@gmail.com"
              />
              <Button fullWidth type="submit" size="large" variant="contained">
                Continue
              </Button>
            </Stack>
          </form>
          <div>{error}</div>
        </>
      </Container>
    </BaseLayout>
  );
};

export default ForgotPassword;
