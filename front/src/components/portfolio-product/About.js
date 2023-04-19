import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePortfolioAbout } from '@/pages/api/portfolio';
import { queryKey } from '@/react-query/constants';
import useInputHook from '@/util/useInputHook';
import { isEmailFormat, isEmptyString, isPhoneNumFormat } from '@/util/utils';
import { errorHandler } from '@/util/errorHandler';

const About = ({ id, name, phone, email }) => {
  const queryClient = useQueryClient();

  const {
    input: editedEmail,
    errorMessage: emailErrorMessage,
    changeHandler: emailChangeHandler,
    handleInputError: handleEmailInputError,
    isError: isEmailError,
  } = useInputHook({
    initialValue: email,
    errorHandler,
  });

  const {
    input: editedPhone,
    errorMessage: phoneErrorMessage,
    changeHandler: phoneChangeHandler,
    handleInputError: handlePhoneInputError,
    isError: isPhoneError,
  } = useInputHook({
    initialValue: phone,
    errorHandler,
  });

  const {
    input: editedName,
    errorMessage: nameErrorMessage,
    changeHandler: nameChangeHandler,
    handleInputError: handleNameInputError,
    isError: isNameError,
  } = useInputHook({
    initialValue: name,
    errorHandler,
  });

  const updateAboutMutation = useMutation((params) => updatePortfolioAbout(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.portfolios, id]);
    },
  });

  const onClickUpdate = useCallback(
    async (e) => {
      e.preventDefault();

      // 유효성 검사
      if (isEmptyString(editedName)) {
        return handleNameInputError('EmptyErr');
      }
      if (isEmptyString(editedPhone)) {
        return handlePhoneInputError('EmptyErr');
      }
      if (isEmptyString(editedEmail)) {
        return handleEmailInputError('EmptyErr');
      }
      if (!isPhoneNumFormat(editedPhone)) {
        return handlePhoneInputError('PhoneFormErr');
      }
      if (!isEmailFormat(editedEmail)) {
        return handleEmailInputError('EmailFormErr');
      }

      const params = {
        id,
        name: editedName,
        phone: editedPhone,
        email: editedEmail,
      };

      await updateAboutMutation.mutate(params);
    },
    [
      editedName,
      editedPhone,
      editedEmail,
      id,
      updateAboutMutation,
      handleNameInputError,
      handlePhoneInputError,
      handleEmailInputError,
    ],
  );

  return (
    <Wrapper id={'about'}>
      <TypographyCustom variant={'h1'}>ABOUT ME</TypographyCustom>

      <TextField
        required
        id="outlined-required"
        label="이름"
        value={editedName}
        onChange={nameChangeHandler}
        helperText={nameErrorMessage}
        error={isNameError}
      />

      <TextField
        required
        id="outlined-required"
        label="연락처"
        value={editedPhone
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/(\-{1,2})$/g, '')}
        onChange={phoneChangeHandler}
        helperText={phoneErrorMessage}
        error={isPhoneError}
      />

      <TextField
        required
        id="outlined-required"
        label="이메일"
        value={editedEmail}
        onChange={emailChangeHandler}
        helperText={emailErrorMessage}
        error={isEmailError}
      />

      <Button onClick={onClickUpdate} variant={'contained'} sx={{ fontSize: '15px' }}>
        수정
      </Button>
    </Wrapper>
  );
};

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
