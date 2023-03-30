import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Chip, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';

const Content = ({ portfolioId, description, projectStacks }) => {
  return <Wrapper></Wrapper>;
};

const SkillsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  transform: translateY(10px);
  transition: all var(--animation-duration) ease;
`;

const SkillInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  .input-btn {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;

const ChipCustom = styled(Chip)`
  font-family: 'Pretendard', serif;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Label = styled(Box)`
  display: table;
  width: auto;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  border-left: 5px solid #222;
  font-weight: 900;
  font-size: 1rem;
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
