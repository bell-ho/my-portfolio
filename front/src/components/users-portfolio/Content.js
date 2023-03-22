import React, { Children, Fragment } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Chip, Link, Stack, Typography } from '@mui/material';

const Content = ({ content: { content, mainFn, front, back, deploy, git } }) => {
  return (
    <Wrapper>
      <Typography variant={'h3'}>
        {content.split('\n').map((line, index) => (
          <Fragment key={index}>
            {line}
            {index !== content.split('\n').length - 1 && <br />}
          </Fragment>
        ))}
      </Typography>
      <ContentWrapper>
        <Box>
          <Label>주요 기능</Label>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
            {Children.toArray(mainFn.map((v) => <ChipCustom label={v} variant="outlined" />))}
          </Stack>
        </Box>
        <Box>
          <Label>Front-End</Label>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
            {Children.toArray(front.map((v) => <ChipCustom label={v} variant="outlined" />))}
          </Stack>
        </Box>
        <Box>
          <Label>Back-End</Label>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
            {Children.toArray(back.map((v) => <ChipCustom label={v} variant="outlined" />))}
          </Stack>
        </Box>
        <Box>
          <Label>Deployment</Label>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
            {Children.toArray(deploy.map((v) => <ChipCustom label={v} variant="outlined" />))}
          </Stack>
        </Box>
        <Box>
          <Label>GitHub</Label>
          <LinkCustom href={git.href} target="_blank" rel="noopener noreferrer" underline="none">
            {git.title}
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
