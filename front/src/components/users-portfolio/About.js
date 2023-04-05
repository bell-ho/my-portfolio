import React, { Children, Fragment } from 'react';
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
      <Typography variant={'section-title'}>ABOUT ME</Typography>
      <ContentWrapper container>
        {Children.toArray(
          items.map((item) => (
            <InfoWrapper>
              <ContentItem item key={item.label} xs={12} md={3}>
                <IconCustom icon={item.icon} />
                <LabelWrapper>
                  <TypographyCustom variant={'label'}>{item.label}</TypographyCustom>
                  <TypographyCustom variant={'labelValue'} sx={{ opacity: '0.8' }}>
                    {item.value}
                  </TypographyCustom>
                </LabelWrapper>
              </ContentItem>
            </InfoWrapper>
          )),
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const InfoWrapper = styled(Box)`
  ${({ theme }) => theme.breakpoints.only('xs')} {
    width: 100%;
  }
`;

const LabelWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentItem = styled(Grid)`
  display: flex;
  gap: 50px;
  ${({ theme }) => theme.breakpoints.up('xs')} {
    width: 100%;
    display: flex;
    margin: 0 auto;
    max-width: 14rem;
    gap: 3rem;
  }
`;

const IconCustom = styled(FontAwesomeIcon)`
  width: 3rem;
  height: 3rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 50px;
    height: 50px;
    font-size: 50px;
  }
`;

const ContentWrapper = styled(Grid)`
  display: flex;
  justify-content: center;
  gap: 6rem;

  ${({ theme }) => theme.breakpoints.only('xs')} {
    gap: 2rem;
  }
`;

const Wrapper = styled(Box)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;
export default About;
