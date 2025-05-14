import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { Collapse, FormControlLabel, Grid, Stack, Switch } from '@mui/material';
import ProjectInfo from '@/components/portfolio-product/ProjectInfo';
import ImageMaker from '@/components/portfolio-product/ImageMaker';
import Content from '@/components/portfolio-product/Content';
import Button from '@mui/material/Button';
import BasicConfirmModal from '@/components/common/BasicConfirmModal';
import Box from '@mui/material/Box';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeProject } from '@/pages/api/project';
import { queryKey } from '@/react-query/constants';

const Project = ({ project }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const projectRemoveMutation = useMutation((params) => removeProject(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.projectsByPortfolio, project.id]);
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
    <Wrapper>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="펼치기"
      />
      <Collapse in={checked} collapsedSize={100}>
        <ProjectWrapper container checked={checked}>
          <Grid item xs={12}>
            <ProjectInfo
              projectId={project?.id}
              name={project?.name}
              startDate={project?.startDate}
              endDate={project?.endDate}
              description={project?.description}
              link={project?.link}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageMaker projectId={project?.id} />
          </Grid>
          <Grid item xs={12}>
            <Content projectId={project?.id} mainFns={project?.mainFns ?? []} />
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
      </Collapse>
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
  border-radius: 20px;
  gap: 1rem;

  text-align: center;
  margin: auto;
  max-width: 500px;

  opacity: ${({ checked }) => (checked ? 1 : 0.3)};
`;

const Wrapper = styled(Box)`
  background-color: rgb(255, 255, 255);
  border-radius: 20px;

  height: 100%;
  padding: 2rem;
`;

export default Project;
