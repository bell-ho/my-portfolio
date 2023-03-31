import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import ProjectSkillsMaker from '@/components/portfolio-product/ProjectSkillsMaker';
import MainFnMaker from '@/components/portfolio-product/MainFnMaker';

const Content = ({ projectId, mainFns }) => {
  return (
    <Wrapper>
      <MainFnMaker projectId={projectId} mainFns={mainFns} />
      <ProjectSkillsMaker projectId={projectId} />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  font-size: 24px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

export default Content;
