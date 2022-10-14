import React, { FunctionComponent, useState } from 'react';
import { CircularProgress, Stack, Typography, Button } from '@mui/material';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { userService } from '../../api';
import BaseLayout from '../../components/Layout/BaseLayout';

export const ConfirmUserMail: FunctionComponent = () => {
  const [mailConfirmed, setMailConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function confirmMail() {
    const fetchToken = searchParams.get('token');
    if (fetchToken) {
      const confirm = await userService.confirmUserMail(fetchToken);
      if (confirm?.success) {
        setMailConfirmed(true);
      }
    } else {
      navigate('/home');
    }
  }

  confirmMail();

  return (
    <BaseLayout>
      {mailConfirmed && (
        <Stack
          pt={15}
          pb={10}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" textAlign="center">
            Mail confirmed
          </Typography>
          <Typography
            mb={5}
            maxWidth={700}
            variant="subtitle2"
            textAlign="center"
          >
            You can now login to your account
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" fullWidth size="large">
              Log in
            </Button>
          </Link>
        </Stack>
      )}

      {!mailConfirmed && (
        <Stack
          pt={15}
          pb={10}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" textAlign="center" mb={5}>
            Confirming mail
          </Typography>
          <CircularProgress size={20} />
        </Stack>
      )}
    </BaseLayout>
  );
};

export default ConfirmUserMail;
