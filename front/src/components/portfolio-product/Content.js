import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import ProjectSkillsMaker from '@/components/portfolio-product/ProjectSkillsMaker';

const Content = ({ projectId, description }) => {
  return (
    <Wrapper>
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
