import React, { Children, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Chip, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import { createMainFn } from '@/pages/api/project';
import { useMainFnsByProjectQuery } from '@/react-query/query-hooks/useMainFnsHook';
import { removeMainFn } from '@/pages/api/mainFn';

const MainFnMaker = ({ projectId }) => {
  const queryClient = useQueryClient();
  const fnNameRef = useRef(null);

  const { data: mainFns, isLoading } = useMainFnsByProjectQuery(projectId);

  const removeMainFnMutation = useMutation((params) => removeMainFn(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.mainFnByProject, projectId]);
    },
  });
  const handleDelete = useCallback(
    async (id) => {
      await removeMainFnMutation.mutate(id);
    },
    [removeMainFnMutation],
  );

  const mainFnInsertMutation = useMutation((params) => createMainFn(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.mainFnByProject, projectId]);
    },
    onSettled: () => {
      fnNameRef.current.value = '';
    },
  });

  const onClickMainFnInsert = useCallback(async () => {
    const name = fnNameRef.current.value;

    const newMainFn = {
      name,
      projectId,
    };

    await mainFnInsertMutation.mutate(newMainFn);
  }, [mainFnInsertMutation, projectId]);

  return (
    <Wrapper>
      <TypographyCustom variant={'h5'}>주요 기능을 추가해 주세요</TypographyCustom>
      <InputWrapper>
        <TextField inputRef={fnNameRef} />
        <Button variant={'contained'} onClick={onClickMainFnInsert}>
          추가
        </Button>
      </InputWrapper>

      <Stack
        direction="row"
        sx={{
          flexWrap: 'wrap',
          gap: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        {Children.toArray(
          mainFns.map((fn, index) => (
            <ChipCustom key={fn.name} label={fn.name} onDelete={() => handleDelete(fn.id)} />
          )),
        )}
      </Stack>
    </Wrapper>
  );
};

const ChipCustom = styled(Chip)`
  font-family: 'Pretendard', serif;
  font-size: 0.9rem;
  font-weight: 500;
`;

const InputWrapper = styled(Box)`
  display: flex;
  gap: 10px;
`;

const Wrapper = styled(Box)`
  font-size: 24px;
  gap: 10px;
  display: flex;
  flex-direction: column;

  padding: 1rem;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
`;

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;
export default MainFnMaker;
