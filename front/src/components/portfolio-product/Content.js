import React, { Children, Fragment } from 'react';
import styled from '@emotion/styled';
import { Chip, Link, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const Content = ({ description, mainFns, projectStacks, link }) => {
  return (
    <Wrapper>
      <Typography variant={'h3'}>{description}</Typography>
      <ContentWrapper>
        <Box>
          <Label>주요 기능</Label>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
            {Children.toArray(mainFns.map((v) => <ChipCustom label={v} variant="outlined" />))}
          </Stack>
        </Box>
        <Box>
          <Label>Front-End</Label>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
            {Children.toArray(
              projectStacks
                .filter((v) => v.code === 'FE')
                .map((v) => <ChipCustom label={v} variant="outlined" />),
            )}
          </Stack>
        </Box>
        <Box>
          <Label>Back-End</Label>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
            {Children.toArray(
              projectStacks
                .filter((v) => v.code === 'BE')
                .map((v) => <ChipCustom label={v} variant="outlined" />),
            )}
          </Stack>
        </Box>
        <Box>
          <Label>Deployment</Label>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
            {Children.toArray(
              projectStacks
                .filter((v) => v.code === 'DP')
                .map((v) => <ChipCustom label={v} variant="outlined" />),
            )}
          </Stack>
        </Box>
        <Box>
          <Label>GitHub</Label>
          <LinkCustom href={link} target="_blank" rel="noopener noreferrer" underline="none">
            깃 주소
          </LinkCustom>
        </Box>
      </ContentWrapper>
    </Wrapper>
  );
};

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

export default Content;
