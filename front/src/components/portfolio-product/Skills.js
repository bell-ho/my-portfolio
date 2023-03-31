import React, { Children, Fragment, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Autocomplete, Chip, Divider, Stack, TextField, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import { useStacksByUserQuery } from '@/react-query/query-hooks/useStacksHook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSkill, targetSkillUpdate } from '@/pages/api/stack';
import { queryKey } from '@/react-query/constants';
import { useDelayed } from '@/util/usePageSearchUtil';

const skillGroup = [
  { name: 'Front End', code: 'FE' },
  { name: 'Back End', code: 'BE' },
  { name: 'Deployment', code: 'DP' },
  { name: 'Communication', code: 'CM' },
  { name: 'Version Control', code: 'VC' },
  { name: '자격증', code: 'CT' },
];

const Skills = ({ userId }) => {
  const queryClient = useQueryClient();

  const { data: stacks } = useStacksByUserQuery(userId);

  const delayedFn = useDelayed();

  const userStackUpdateMutation = useMutation((params) => targetSkillUpdate(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.stacksByUser, userId]);
    },
  });

  const handleClick = useCallback(
    async (stack) => {
      const params = {
        target: 'user',
        stackId: stack.id,
        targetId: userId,
      };

      delayedFn(async () => {
        await userStackUpdateMutation.mutate(params);
      }, 300);
    },
    [delayedFn, userId, userStackUpdateMutation],
  );

  const skillClassificationRef = useRef(null);
  const skillNameRef = useRef(null);

  const userSkillInsertMutation = useMutation((params) => createSkill(params), {
    enabled: !!userId,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.stacksByUser, userId]);
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
      target: 'user',
      targetId: userId,
      name: skillName,
      code: selectedCode,
    };

    await userSkillInsertMutation.mutate(newSkill);
  }, [userId, userSkillInsertMutation]);

  return (
    <Wrapper id={'skills'}>
      <TypographyCustom variant={'h1'}>SKILLS</TypographyCustom>

      <SkillsContainer>
        <TypographyCustom variant={'h7'}>사용하는 STACK을 클릭해주세요</TypographyCustom>
        <TypographyCustom variant={'h7'}>없으면 추가해주세요.</TypographyCustom>
        <SkillInputWrapper>
          <Autocomplete
            id="combo-box-demo"
            options={skillGroup}
            getOptionLabel={(option) => option.name}
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
            maxHeight: '300px',
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
                    backgroundColor: stack.userStack ? '#1976d2' : '',
                    color: stack.userStack ? '#ffffff' : '',
                  }}
                />
              </Fragment>
            )),
          )}
        </Stack>
      </SkillsContainer>
    </Wrapper>
  );
};

const ChipCustom = styled(Chip)`
  font-family: 'Pretendard', serif;
  font-size: 0.9rem;
  font-weight: 500;
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

const SkillsContainer = styled(Box)`
  width: 17rem;
  margin: 0 auto 2rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 1rem 1rem 1rem 0 rgb(68 68 68 / 20%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  transform: translateY(10px);
  transition: all var(--animation-duration) ease;
`;

const Wrapper = styled(Box)`
  background-color: #f9c51d;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;
  padding: 2rem;
`;

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;
export default Skills;
