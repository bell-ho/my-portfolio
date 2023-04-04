import React, { Children, useCallback, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import BasicModal from '@/components/common/BasicModal';
import MakeProject from '@/components/portfolio-product/MakeProject';
import { useProjectsByPortfolioQuery } from '@/react-query/query-hooks/useProjectsHook';
import Button from '@mui/material/Button';
import Content from '@/components/portfolio-product/Content';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import { removeProject } from '@/pages/api/project';
import ImageMaker from '@/components/portfolio-product/ImageMaker';
import BasicConfirmModal from '@/components/common/BasicConfirmModal';
import ProjectInfo from '@/components/portfolio-product/ProjectInfo';
import Project from '@/components/portfolio-product/Project';

const Projects = ({ portfolioId }) => {
  const { data: projects, isLoading } = useProjectsByPortfolioQuery(portfolioId);

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
