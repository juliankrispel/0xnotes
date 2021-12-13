import { createTheme, ThemeProvider } from '@mui/material'
import { MetaMaskProvider } from 'metamask-react'
import React from 'react'
import { theme } from '../lib/theme';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <ThemeProvider theme={theme(true)}>
        <Component {...pageProps} />
      </ThemeProvider>
    </MetaMaskProvider>
  );
};

export default MyApp
