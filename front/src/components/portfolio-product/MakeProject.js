import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { queryKey } from '@/react-query/constants';
import { createProject } from '@/pages/api/project';
import { useProjectsByPortfolioQuery } from '@/react-query/query-hooks/useProjectsHook';

const MakeProject = ({ handleClose }) => {
  const router = useRouter();
  const { portfolioId } = router.query;
  const nameInputRef = useRef(null);
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation((params) => createProject(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.projectsByPortfolio, portfolioId]);
      handleClose();
    },
  });

  const onClickCreate = useCallback(async () => {
    const name = nameInputRef.current.value;

    const params = {
      name,
      portfolioId,
    };

    await createProjectMutation.mutate(params);
  }, [createProjectMutation, portfolioId]);

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
export default MakeProject;
