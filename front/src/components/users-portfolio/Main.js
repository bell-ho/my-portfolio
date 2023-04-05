import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Main = ({ imageSrc, title, description }) => {
  return (
    <Wrapper id={'main'}>
      <ImageCustom width={250} height={250} src={imageSrc} alt={'main_profile'} />
      <Typography variant={'mast-head-title'}>{title}</Typography>
      <Typography variant={'mast-subtitle'}>{description}</Typography>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background: url('/images/home_background.png') center/cover no-repeat;
  padding: 7.5rem 2.5rem 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ImageCustom = styled(Image)`
  border-radius: 50%;
  background-color: #e06b6b;
  border: 2px solid var(--color-light-white);
`;

const TypographyCustom = styled(Typography)`
  color: var(--color-white);
`;
export default Main;
