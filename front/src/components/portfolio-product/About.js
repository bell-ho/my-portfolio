import React, { useCallback, useRef } from 'react';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePortfolioAbout } from '@/pages/api/portfolio';
import { queryKey } from '@/react-query/constants';

const About = ({ id, name, phone, email }) => {
  const queryClient = useQueryClient();

  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const items = [
    { icon: faUser, label: '이름', value: name ?? '' },
    { icon: faPhone, label: '연락처', value: phone ?? '' },
    { icon: faEnvelope, label: '이메일', value: email ?? '' },
  ];

  const updateAboutMutation = useMutation((params) => updatePortfolioAbout(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.portfolios, id]);
    },
  });

  const onClickUpdate = useCallback(async () => {
    const name = nameInputRef.current.value;
    const phone = phoneInputRef.current.value;
    const email = emailInputRef.current.value;

    const params = {
      id,
      name,
      phone,
      email,
    };

    await updateAboutMutation.mutate(params);
  }, [id, updateAboutMutation]);

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

      <TextField required id="outlined-required" label="이름" inputRef={nameInputRef} />
      <TextField required id="outlined-required" label="연락처" inputRef={phoneInputRef} />
      <TextField required id="outlined-required" label="이메일" inputRef={emailInputRef} />

      <Button onClick={onClickUpdate} variant={'contained'} sx={{ fontSize: '15px' }}>
        수정
      </Button>
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
