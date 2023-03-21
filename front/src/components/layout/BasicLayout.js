import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const BasicLayout = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

const Wrapper = styled(Box)``;
export default BasicLayout;
