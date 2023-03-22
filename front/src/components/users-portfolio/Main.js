import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Main = () => {
  return (
    <Wrapper>
      <ImageCustom width={250} height={250} src={`/images/main_profile.jpg`} alt={'main_profile'} />
      <TypographyCustom variant={'h1'}>JH's Portfolio</TypographyCustom>
      <TypographyCustom variant={'h2'}>
        안녕하세요 <br />웹 개발자 이종호 입니다.
      </TypographyCustom>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background: url('/images/home_background.png') center/cover no-repeat;
  padding: 7.5rem 2.5rem 2.5rem;
  text-align: center;
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
