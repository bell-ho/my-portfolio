import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import InfoForm from '@/components/portfolio-form/InfoForm';
import { Typography } from '@mui/material';

const Product = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Typography variant={'h1'} sx={{ color: 'white' }}>
          기본 정보 입력
        </Typography>
        <InfoForm />
      </FormWrapper>
    </Wrapper>
  );
};
const FormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const Wrapper = styled(Box)`
  background-color: #1d809f;
  padding: 2rem;
`;
export default Product;
