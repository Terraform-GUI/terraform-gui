import * as React from 'react';

import Header from '../../Navigation/Header';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = (props: BaseLayoutProps) => {
  const { children } = props;

  return (
    <main>
      <Header />
      {children}
    </main>
  );
};
export default BaseLayout;
