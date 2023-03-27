import React, { Children, useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Autocomplete, Chip, Stack, TextField, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';

const Skills = () => {
  const handleClick = (index) => {
    const newSelectedChips = [...selectedChips];
    newSelectedChips[index] = !newSelectedChips[index];
    console.log(chipsData[index], newSelectedChips[index]);
    setSelectedChips(newSelectedChips);
  };

  const [selectedChips, setSelectedChips] = useState([]);

  const chipsData = [
    { name: 'react', classi: 'FE' },
    { name: 'react-redux', classi: 'FE' },
    { name: 'react-query', classi: 'FE' },
    { name: 'react-saga', classi: 'FE' },
  ];

  const classi = ['FRONT', 'BACK'];

  const skillClassificationRef = useRef(null);
  const skillNameRef = useRef(null);

  const onClickSkillInsert = useCallback(() => {
    const skillName = skillNameRef.current.value;
    const skillClassification = skillClassificationRef.current.value;
  }, []);

  return (
    <Wrapper id={'skills'}>
      <TypographyCustom variant={'h1'}>SKILLS</TypographyCustom>

      <SkillsContainer>
        <TypographyCustom variant={'h7'}>원하는 스킬이 없나요?</TypographyCustom>
        <SkillInputWrapper>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={classi}
            renderInput={(params) => (
              <TextField inputRef={skillClassificationRef} {...params} label="분류" />
            )}
          />
          <Box className={'input-btn'}>
            <TextField inputRef={skillNameRef} />
            <Button variant={'contained'} onClick={onClickSkillInsert}>
              등록
            </Button>
          </Box>
        </SkillInputWrapper>
        <Stack direction="column" spacing={1}>
          {Children.toArray(
            chipsData.map((chip, index) => (
              <Chip
                key={index}
                label={chip.name}
                onClick={() => handleClick(index)}
                deleteIcon={<DoneIcon />}
                style={{
                  backgroundColor: selectedChips[index] ? '#1976d2' : '',
                  color: selectedChips[index] ? '#ffffff' : '',
                }}
              />
            )),
          )}
        </Stack>
      </SkillsContainer>
    </Wrapper>
  );
};

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

  &:hover {
    transform: translateY(0px);
    transition: transform 0.3s ease;
  }
`;

const SkillsWrapper = styled(Box)``;

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
