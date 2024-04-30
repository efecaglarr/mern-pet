import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const NavLink = ({ to, children }) => {
  return (
    <RouterLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Typography
        sx={{
          fontFamily: 'Mulish',
          color: '#8b939f',
          fontWeight: 'bold',
          fontSize: '14px',
          marginLeft: '10px',
          marginRight: '10px',
          '&:hover': {
            color: 'black',
          },
        }}
      >
        {children}
      </Typography>
    </RouterLink>
  );
};

export default NavLink;