import { Box, useScrollTrigger, Zoom } from '@mui/material';
import { FC } from 'react';

// https://mui.com/material-ui/react-app-bar/#back-to-top

interface ScrollTopButtonProps {
  children: React.ReactNode;
}

const ScrollTopButton: FC<ScrollTopButtonProps> = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 70, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

export default ScrollTopButton;
