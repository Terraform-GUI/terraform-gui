import './index.css';

import { Stack, Typography } from '@mui/material';
import BaseLayout from '../../components/Layout/BaseLayout';

function HomePage() {
  return (
    <BaseLayout>
      <div className="section-home__main">
        <Stack
          pt={15}
          pb={10}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" textAlign="center">
            Terraform GUI
          </Typography>
          <Typography variant="h4" textAlign="center" maxWidth={700}>
            Design your perfect infrastructure. Terraform GUI makes it easy.
          </Typography>
        </Stack>
      </div>
    </BaseLayout>
  );
}

export default HomePage;
