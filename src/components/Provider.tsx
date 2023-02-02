'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider, ThemeValue } from './contexts/ThemeContext';
import { WalletProvider } from './Connect';

// Redux Store is injected here with the Redux Provider.
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store/store';

interface Props {
  theme?: ThemeValue;
}

export default function Provider({ children, theme }: PropsWithChildren<Props>) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme={theme}>
        <WalletProvider>{children}</WalletProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
