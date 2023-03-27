import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Navbar from '@/components/users-portfolio/Navbar';
import Main from '@/components/portfolio-product/Main';

const Product = () => {
  return (
    <Fragment>
      <Navbar />
      <Main />
    </Fragment>
  );
};

const Wrapper = styled(Box)`
  background-color: #1d809f;
  padding: 2rem;
`;
export default Product;
