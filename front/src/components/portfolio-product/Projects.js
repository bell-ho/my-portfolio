import React, { Children, useCallback, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import ImageBox from '@/components/users-portfolio/ImageBox';
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

const Projects = ({ portfolioId }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useProjectsByPortfolioQuery(portfolioId);

  const projectRemoveMutation = useMutation((params) => removeProject(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.projectsByPortfolio, portfolioId]);
    },
  });

  const onClickRemoveProject = useCallback(
    async (id) => {
      await projectRemoveMutation.mutate(id);
    },
    [projectRemoveMutation],
  );

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = useCallback(
    (id) => {
      onClickRemoveProject(id);
      setOpen(false);
    },
    [onClickRemoveProject],
  );

  return (
    <Wrapper id={'projects'}>
      <TypographyCustom variant={'h1'}>PROJECTS</TypographyCustom>

      <BasicModal btnName={'만들기'}>
        <MakeProject />
      </BasicModal>

      {Children.toArray(
        projects.map((project) => (
          <ProjectWrapper container>
            <Grid item xs={12}>
              <Typography variant={'h1'}>{project?.name}</Typography>
              <Typography variant={'h3'}>{project?.period}</Typography>
            </Grid>
            <Grid item container spacing={4}>
              <Grid item xs={12} md={6}>
                <ImageMaker projectId={project?.id} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Content
                  projectId={project?.id}
                  description={project?.description}
                  link={project?.link}
                  mainFns={project?.mainFns ?? []}
                  projectStacks={project?.projectStacks ?? []}
                />
              </Grid>
            </Grid>
            <ButtonWrapper>
              <Button onClick={handleClickOpen} fullWidth variant="contained" color={'error'}>
                프로젝트 삭제
              </Button>
              <BasicConfirmModal
                open={open}
                handleClose={handleClose}
                handleConfirm={() => handleConfirm(project?.id)}
                message={'프로젝트를 삭제하시겠습니까?'}
              />
            </ButtonWrapper>
          </ProjectWrapper>
        )),
      )}
    </Wrapper>
  );
};
const ButtonWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;
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

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;

export default Projects;
