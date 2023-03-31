import React, { Children, Fragment, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { Autocomplete, Chip, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSkill } from '@/pages/api/stack';
import { queryKey } from '@/react-query/constants';
import ProjectSkillsMaker from '@/components/portfolio-product/ProjectSkillsMaker';

const Content = ({ projectId, description, projectStacks }) => {
  return (
    <Wrapper>
      <ProjectSkillsMaker projectId={projectId} />
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
`;

const LinkCustom = styled(Link)`
  font-size: 1rem;
  font-weight: 900;
  font-family: 'Pretendard', serif;
  margin-left: 10px;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Wrapper = styled(Box)`
  font-size: 24px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;

export default Content;
