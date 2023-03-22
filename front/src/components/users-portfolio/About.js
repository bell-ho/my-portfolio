import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';

const About = () => {
  return (
    <Wrapper id={'about'}>
      <TypographyCustom variant={'h1'}>ABOUT ME</TypographyCustom>
      <ContentWrapper container>
        <ContentItem xs={12} md={3}>
          <IconCustom icon={faUser} />
          <LabelWrapper>
            <TypographyCustom variant={'label'}>이름</TypographyCustom>
            <TypographyCustom variant={'labelValue'}>이종호</TypographyCustom>
          </LabelWrapper>
        </ContentItem>
        <ContentItem xs={12} md={3}>
          <IconCustom icon={faPhone} />
          <LabelWrapper>
            <TypographyCustom variant={'label'}>연락처</TypographyCustom>
            <TypographyCustom variant={'labelValue'}>010-8560-1074</TypographyCustom>
          </LabelWrapper>
        </ContentItem>
        <ContentItem xs={12} md={3}>
          <IconCustom icon={faEnvelope} />
          <LabelWrapper>
            <TypographyCustom variant={'label'}>이메일</TypographyCustom>
            <TypographyCustom variant={'labelValue'}>jj0101065@gmail.com</TypographyCustom>
          </LabelWrapper>
        </ContentItem>
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
    padding: 0 3rem;
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
