import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';

const Contact = () => {
  return (
    <Wrapper id={'contact'}>
      <TypographyCustom>
        2023. Lee Jong Ho <br /> All rights reserved
      </TypographyCustom>
      <IconWrapper>
        <a href={'https://github.com/bell-ho'} target={'_blank'}>
          <GitHubIcon style={{ fontSize: 46, color: 'white' }} />
        </a>
        <a href="https://velog.io/@bell-ho" target="_blank" rel="noreferrer">
          <ImageCustom
            width={46}
            height={46}
            layout={'fixed'}
            src={'/images/velog.jpg'}
            alt={'velog'}
          />
        </a>
      </IconWrapper>
    </Wrapper>
  );
};

const TypographyCustom = styled(Typography)`
  font-size: 1rem;
  color: var(--color-white);
`;

const IconWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ImageCustom = styled(Image)`
  border-radius: 10px;
`;

const Wrapper = styled(Box)`
  background-color: var(--color-pink);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding: 2rem;
`;

export default Contact;
