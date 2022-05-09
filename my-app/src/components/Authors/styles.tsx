import styled from '@emotion/styled';
import { Link } from '@mui/material';

export const StyledLink = styled(Link)({
  color: 'inherit',
  whiteSpace: 'nowrap',
  transition: '0.1s',
  textDecoration: 'none',
  ':hover': {
    color: '#8b8b8b',
  },
});
