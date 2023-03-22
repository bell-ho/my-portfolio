import React, { Children } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { getRandomColor } from '@/util/utils';

const Skills = () => {
  const skills = [
    {
      name: 'Front End',
      stacks: [
        'react',
        'react query',
        'redux saga',
        'next.js',
        'javascript',
        'html',
        'css',
        'mui',
        'bootstrap',
        'vue.js',
      ],
    },
    {
      name: 'Back End',
      stacks: ['spring boot', 'spring', 'jpa', 'java', 'mysql', 'mariaDB', 'oracle'],
    },
    {
      name: 'Version Control',
      stacks: ['github', 'gitlab'],
    },
    {
      name: 'Communication',
      stacks: ['jira', 'notion', 'figma'],
    },
    {
      name: 'Deployment',
      stacks: ['Amazon AWS', 'Amazon RDS', 'Amazon S3', 'AWS Lambda'],
    },
    {
      name: 'Certificate',
      stacks: ['정보처리기사'],
    },
  ];

  return (
    <Wrapper id={'skills'}>
      <TypographyCustom variant={'h1'}>SKILLS</TypographyCustom>
      {Children.toArray(
        skills.map((v) => (
          <SkillsContainer>
            <Typography variant={'skillsTitle'}>{v.name}</Typography>
            {Children.toArray(
              v.stacks.map((stack) => (
                <Image
                  width={224}
                  height={46}
                  layout="responsive"
                  unoptimized={true}
                  src={`https://img.shields.io/badge/${stack}-${getRandomColor()}?style=for-the-badge&logo=${stack}&logoColor=white`}
                  alt={'springboot'}
                />
              )),
            )}
          </SkillsContainer>
        )),
      )}
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
