import React, { Children } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { getRandomColor } from '@/util/utils';
import Masonry from '@mui/lab/Masonry';

const SkillBadge = ({ skill }) => (
  <Image
    width={224}
    height={46}
    layout="responsive"
    unoptimized={true}
    src={`https://img.shields.io/badge/${skill.name}-${getRandomColor()}?style=for-the-badge&logo=${
      skill.name
    }&logoColor=white`}
    alt={`skills-${skill.name}`}
  />
);
const SkillsSection = ({ title, skills }) => (
  <SkillsContainer>
    <Grid item xs={12}>
      <Typography variant={'skillsTitle'}>{title}</Typography>
    </Grid>
    {Children.toArray(skills?.map((skill) => <SkillBadge skill={skill} />))}
  </SkillsContainer>
);

const Skills = ({ skills } = {}) => {
  const be = skills?.filter((v) => v.code === 'BE');
  const fe = skills?.filter((v) => v.code === 'FE');
  const dp = skills?.filter((v) => v.code === 'DP');
  const vc = skills?.filter((v) => v.code === 'VC');
  const cm = skills?.filter((v) => v.code === 'CM');
  const ct = skills?.filter((v) => v.code === 'CT');

  return (
    <Wrapper id={'skills'}>
      <Typography variant={'section-title'}>SKILLS</Typography>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
        spacing={4}
        sx={{ maxWidth: '1200px' }}
      >
        <SkillsSection title="Back End" skills={be} />
        <SkillsSection title="Front End" skills={fe} />
        <SkillsSection title="Deployment" skills={dp} />
        <SkillsSection title="Version Control" skills={vc} />
        <SkillsSection title="Communication" skills={cm} />
        <SkillsSection title="Certification" skills={ct} />
      </Masonry>
    </Wrapper>
  );
};
const SkillsContainer = styled(Box)`
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

const Wrapper = styled(Box)`
  background-color: #f9c51d;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
`;

export default Skills;
