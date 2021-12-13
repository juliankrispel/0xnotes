import { Box } from '@mui/material';
import { useTheme } from '@mui/system';
import { useMetaMask } from 'metamask-react';
import { ZeroXNotes } from '../lib/components/ZeroXNotesEditor'

const App = () => {
  const { status, connect, account } = useMetaMask();

  if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

  if (status === "unavailable") return <div>MetaMask not available :(</div>

  if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>

  if (status === "connecting") return <div>Connecting...</div>

  if (status === "connected") return <ZeroXNotes />;
}

export default function Home() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
        background: theme.palette.background.default,
        display: "flex",
        color: theme.palette.text.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <App />
    </Box>
  );
}
