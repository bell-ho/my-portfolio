import React, { Children, Fragment } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Chip, Link, Stack, Typography } from '@mui/material';
const Section = ({ title, items }) => {
  if (items.length > 0) {
    return (
      <Box>
        <Label>{title}</Label>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, ml: 1 }}>
          {Children.toArray(items?.map((v) => <ChipCustom label={v?.name} variant="outlined" />))}
        </Stack>
      </Box>
    );
  }
};
const Content = ({ mainFns, skills, description }) => {
  const be = skills.filter((v) => v.code === 'BE');
  const fe = skills.filter((v) => v.code === 'FE');
  const dp = skills.filter((v) => v.code === 'DP');

  return (
    <Wrapper>
      <Typography variant={'h3'}>
        {description?.split('\n').map((line, index) => (
          <Fragment key={index}>
            {line}
            {index !== description.split('\n').length - 1 && <br />}
          </Fragment>
        ))}
      </Typography>
      <ContentWrapper>
        {mainFns && <Section title={'주요 기능'} items={mainFns} />}
        {be && <Section title={'Back End'} items={be} />}
        {fe && <Section title={'Front End'} items={fe} />}
        {dp && <Section title={'Deployment'} items={dp} />}
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
