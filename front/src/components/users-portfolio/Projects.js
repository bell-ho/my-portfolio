import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ImageBox from '@/components/users-portfolio/ImageBox';
import Content from '@/components/users-portfolio/Content';

const Projects = () => {
  const images = [
    'https://jh-mybucket.s3.ap-northeast-2.amazonaws.com/uploads/memo1.jpg',
    'https://jh-mybucket.s3.ap-northeast-2.amazonaws.com/uploads/memo2.jpg',
    'https://jh-mybucket.s3.ap-northeast-2.amazonaws.com/uploads/memo3.jpg',
    'https://jh-mybucket.s3.ap-northeast-2.amazonaws.com/uploads/memo4.jpg',
    'https://jh-mybucket.s3.ap-northeast-2.amazonaws.com/uploads/memo5.jpg',
    'https://jh-mybucket.s3.ap-northeast-2.amazonaws.com/uploads/memo6.jpg',
  ];
  const mainContent = {
    content: `나만의 메모를 공유하는 프로젝트.\n 나의 일상 생활을 공유하고\n 남의 일상을 공감하는 서비스 입니다. `,
    mainFn: [
      '로그인',
      '게시판',
      '댓글',
      '팔로우-팔로잉',
      '메모 공유',
      '게시글 태그 기능',
      '좋아요 싫어요 기능',
    ],
    front: ['React.js', 'Next.js', 'Redux-Saga', 'React-Query'],
    back: ['Express', 'MYSQL'],
    deploy: ['AWS EC2', 'AWS S3'],
    git: { href: 'https://github.com/bell-ho/memo-life', title: 'MEMO-LIFE' },
  };

  return (
    <Wrapper id={'projects'}>
      <TypographyCustom variant={'h1'}>PROJECTS</TypographyCustom>
      <ProjectWrapper container>
        <Grid xs={12}>
          <Typography variant={'h1'}>MY-BLOG</Typography>
          <Typography variant={'h3'}>2022.2 ~ 2022.3</Typography>
        </Grid>
        <Grid item container spacing={4}>
          <Grid item xs={12} md={6}>
            <ImageBox images={images} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Content content={mainContent} />
          </Grid>
        </Grid>
      </ProjectWrapper>
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

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;
export default Projects;
