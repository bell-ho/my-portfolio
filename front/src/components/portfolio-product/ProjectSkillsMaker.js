import React, { Children, Fragment, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import { Autocomplete, Chip, Divider, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSkill, targetSkillUpdate, userSkillUpdate } from '@/pages/api/stack';
import { queryKey } from '@/react-query/constants';
import { useStacksByProjectQuery } from '@/react-query/query-hooks/useStacksHook';
import { useDelayed } from '@/util/usePageSearchUtil';

const ProjectSkillsMaker = ({ projectId }) => {
  const queryClient = useQueryClient();
  const delayedFn = useDelayed();

  const { data: stacks, isLoading } = useStacksByProjectQuery(projectId);

  const skillGroup = [
    { name: 'Front End', code: 'FE' },
    { name: 'Back End', code: 'BE' },
    { name: 'Deployment', code: 'DP' },
  ];

  const skillClassificationRef = useRef(null);
  const skillNameRef = useRef(null);

  const projectStackUpdateMutation = useMutation((params) => targetSkillUpdate(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.stacksByProject, projectId]);
    },
  });

  const handleClick = useCallback(
    async (stack) => {
      const params = {
        target: 'project',
        stackId: stack.id,
        targetId: projectId,
      };

      delayedFn(async () => {
        await projectStackUpdateMutation.mutate(params);
      }, 300);
    },
    [delayedFn, projectId, projectStackUpdateMutation],
  );

  const projectSkillInsertMutation = useMutation((params) => createSkill(params), {
    enabled: !!projectId,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.stacksByProject, projectId]);
    },
    onSettled: () => {
      skillNameRef.current.value = '';
      skillClassificationRef.current.value = '';
    },
  });

  const onClickSkillInsert = useCallback(async () => {
    const skillName = skillNameRef.current.value;
    const skillClassification = skillClassificationRef.current.value;

    const selectedCode = skillGroup.find((c) => c.name === skillClassification)?.code;

    const newSkill = {
      target: 'project',
      targetId: projectId,
      name: skillName,
      code: selectedCode,
    };

    await projectSkillInsertMutation.mutate(newSkill);
  }, [projectId, projectSkillInsertMutation, skillGroup]);

  return (
    <Wrapper>
      <Box>
        <TypographyCustom variant={'h5'}>사용한 STACK을 클릭해주세요</TypographyCustom>
        <TypographyCustom variant={'h5'}>없으면 추가해주세요.</TypographyCustom>
      </Box>
      <SkillInputWrapper>
        <Autocomplete
          id="combo-box-demo"
          options={skillGroup}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          renderInput={(params) => (
            <TextField inputRef={skillClassificationRef} {...params} label="분류" />
          )}
        />
        <Box className={'input-btn'}>
          <TextField inputRef={skillNameRef} />
          <Button variant={'contained'} onClick={onClickSkillInsert}>
            추가
          </Button>
        </Box>
      </SkillInputWrapper>
      <Stack
        direction="row"
        sx={{
          flexWrap: 'wrap',
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        {Children.toArray(
          stacks.map((stack, index) => (
            <Fragment>
              {index !== 0 && stack.code !== stacks[index - 1].code && (
                <Divider
                  orientation="horizontal"
                  flexItem
                  sx={{ margin: '5px 0', height: '1px', width: '100%' }}
                />
              )}
              <ChipCustom
                key={stack.name}
                label={stack.name}
                onClick={() => handleClick(stack)}
                deleteIcon={<DoneIcon />}
                style={{
                  backgroundColor: stack.projectStack ? '#1976d2' : '',
                  color: stack.projectStack ? '#ffffff' : '',
                }}
              />
            </Fragment>
          )),
        )}
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  font-size: 24px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const SkillInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  .input-btn {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;

const ChipCustom = styled(Chip)`
  font-family: 'Pretendard', serif;
  font-size: 0.9rem;
  font-weight: 500;
`;

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;

export default ProjectSkillsMaker;
