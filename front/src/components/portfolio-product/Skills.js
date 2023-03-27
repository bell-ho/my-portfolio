import React, { Children } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { getRandomColor } from '@/util/utils';
import SkillsAutoComplete from '@/components/portfolio-product/SkillsAutoComplete';

const Skills = () => {
  const skills = [
    {
      name: 'Front End',
      stacks: ['react'],
    },
    {
      name: 'Back End',
      stacks: ['spring boot'],
    },
    {
      name: 'Version Control',
      stacks: ['github'],
    },
    {
      name: 'Communication',
      stacks: ['jira'],
    },
    {
      name: 'Deployment',
      stacks: ['Amazon AWS'],
    },
    {
      name: 'Certificate',
      stacks: ['정보처리기사'],
    },
  ];

  return (
    <Wrapper id={'skills'}>
      <TypographyCustom variant={'h1'}>SKILLS</TypographyCustom>
      <SkillsAutoComplete />
    </Wrapper>
  );
};
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
