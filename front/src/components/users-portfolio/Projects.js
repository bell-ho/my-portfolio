import React, { Children } from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ImageBox from '@/components/users-portfolio/ImageBox';
import Content from '@/components/users-portfolio/Content';

const Projects = ({ projects }) => {
  return (
    <Wrapper id={'projects'}>
      <Typography variant={'section-title'}>PROJECTS</Typography>
      {Children.toArray(
        projects?.map((project) => (
          <ProjectWrapper container>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Typography variant={'h1'}>{project?.name}</Typography>
              <Typography variant={'h3'}>{`${project?.startDate || ''} ~ ${
                project?.endDate || ''
              }`}</Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                {project?.images?.length <= 0 && (
                  <Typography variant={'section-title'}>이미지가 없습니다.</Typography>
                )}
                <ImageBox images={project?.images} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Content
                  description={project?.description}
                  mainFns={project?.mainFns}
                  skills={project?.projectSkills}
                />
              </Grid>
            </Grid>
          </ProjectWrapper>
        )),
      )}
    </Wrapper>
  );
};

const ProjectWrapper = styled(Grid)`
  background-color: rgb(255, 255, 255);
  padding: 2rem;
  border-radius: 20px;
  gap: 1rem;

  text-align: center;
  margin: auto;
  max-width: 1200px;
`;

const Wrapper = styled(Box)`
  background-color: #1d809f;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2rem;
  padding: 2rem;
`;

export default Projects;
