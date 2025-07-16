import React, { useContext, useEffect, useRef } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../SocketContext';

const StyledVideo = styled('video')(({ theme }) => ({
  width: '550px',
  [theme.breakpoints.down('xs')]: {
    width: '300px',
  },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const StyledPaper = styled(Paper)({
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
});

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  
 
  useEffect(() => {
    if (stream && myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <GridContainer container>
      {stream && (
        <StyledPaper>
          <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
          <StyledVideo ref={myVideo} playsInline muted autoPlay />
        </StyledPaper>
      )}
      {callAccepted && !callEnded && (
        <StyledPaper>
          <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
          <StyledVideo ref={userVideo} playsInline autoPlay />
        </StyledPaper>
      )}
    </GridContainer>
  );
};

export default VideoPlayer;