import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';

const About = ({ about: { name, phone, email } }) => {
  const items = [
    { icon: faUser, label: '이름', value: name },
    { icon: faPhone, label: '연락처', value: phone },
    { icon: faEnvelope, label: '이메일', value: email },
  ];

  return (
    <Wrapper id={'about'}>
      <TypographyCustom variant={'h1'}>ABOUT ME</TypographyCustom>
      <ContentWrapper container>
        {items.map((item) => (
          <ContentItem item key={item.label} xs={12} md={3}>
            <IconCustom icon={item.icon} />
            <LabelWrapper>
              <TypographyCustom variant={'label'}>{item.label}</TypographyCustom>
              <TypographyCustom variant={'labelValue'}>{item.value}</TypographyCustom>
            </LabelWrapper>
          </ContentItem>
        ))}
      </ContentWrapper>
    </Wrapper>
  );
};

const LabelWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentItem = styled(Grid)`
  display: flex;
  justify-content: center;
  gap: 50px;

  ${({ theme }) => theme.breakpoints.up('xs')} {
    gap: 30px;
    padding: 0 2rem;
    justify-content: flex-start;
  }
`;

const IconCustom = styled(FontAwesomeIcon)`
  width: 30px;
  height: 30px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 50px;
    height: 50px;
    font-size: 50px;
  }
`;

const ContentWrapper = styled(Grid)`
  display: flex;
  gap: 30px;
  justify-content: center;
`;

const Wrapper = styled(Box)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;
export default About;
