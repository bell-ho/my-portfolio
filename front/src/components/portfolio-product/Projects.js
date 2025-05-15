import React, { Children } from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import BasicModal from '@/components/common/BasicModal';
import MakeProject from '@/components/portfolio-product/MakeProject';
import { useProjectsByPortfolioQuery } from '@/react-query/query-hooks/useProjectsHook';
import Project from '@/components/portfolio-product/Project';

const Projects = ({ portfolioId }) => {
  const { data: projects } = useProjectsByPortfolioQuery(portfolioId);

  return (
    <Wrapper id={'projects'}>
      <TypographyCustom variant={'h1'}>PROJECTS</TypographyCustom>

      <BasicModal btnName={'만들기'}>
        <MakeProject />
      </BasicModal>

      {Children.toArray(projects.map((project) => <Project project={project} />))}
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background-color: #1d809f;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2rem;
  padding: 2rem;
`;

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;

export default Projects;
