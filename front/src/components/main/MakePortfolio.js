import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPortfolio } from '@/pages/api/portfolio';
import { useSession } from 'next-auth/react';
import { queryKey } from '@/react-query/constants';

const MakePortfolio = ({ handleClose }) => {
  const { data: session, status } = useSession();
  const nameInputRef = useRef(null);

  const queryClient = useQueryClient();

  const createPortfolioMutation = useMutation((params) => createPortfolio(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.portfoliosByUser, session?.user?.id]);
      handleClose();
    },
  });

  const onClickCreate = useCallback(async () => {
    const name = nameInputRef.current.value;
    const portfolios = queryClient.getQueryData([queryKey.portfoliosByUser, session?.user?.id]);

    if (portfolios?.length >= 3) {
      alert('포트폴리오는 최대 3개까지 가능합니다');
      handleClose();
      return;
    }

    const params = {
      name,
      userId: session?.user?.id,
    };

    await createPortfolioMutation.mutate(params);
  }, [createPortfolioMutation, handleClose, queryClient, session?.user?.id]);

  return (
    <Wrapper>
      <InputWrapper>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="이름 필수"
          inputRef={nameInputRef}
        />
      </InputWrapper>
      <Button onClick={onClickCreate} fullWidth variant={'contained'}>
        등록
      </Button>
    </Wrapper>
  );
};

const InputWrapper = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default MakePortfolio;
