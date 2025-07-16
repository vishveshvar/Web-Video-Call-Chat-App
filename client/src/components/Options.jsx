import React, { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';

import { SocketContext } from '../SocketContext';

// Optional: Error boundary for CopyToClipboard rendering safety
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('Error caught in ErrorBoundary:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <Typography color="error">Clipboard feature failed.</Typography>;
    }
    return this.props.children;
  }
}

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  width: '600px',
  margin: '35px 0',
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}));

const StyledPaper = styled(Paper)({
  padding: '10px 20px',
  border: '2px solid black',
});

const Options = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);

  const [idToCall, setIdToCall] = useState('');

  return (
    <StyledContainer>
      <StyledPaper elevation={10}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            {/* Account Info */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <Box sx={{ mt: 2 }}>
                <ErrorBoundary>
                  <CopyToClipboard text={me}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<Assignment fontSize="large" />}
                    >
                      Copy Your ID
                    </Button>
                  </CopyToClipboard>
                </ErrorBoundary>
              </Box>
            </Grid>

            {/* Call Controls */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography gutterBottom variant="h6">
                Make a Call
              </Typography>
              <TextField
                label="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              <Box sx={{ mt: 2 }}>
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<PhoneDisabled fontSize="large" />}
                    onClick={leaveCall}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Phone fontSize="large" />}
                    onClick={() => callUser(idToCall)}
                  >
                    Call
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
        {children}
      </StyledPaper>
    </StyledContainer>
  );
};

export default Options;