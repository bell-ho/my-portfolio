import Navbar from '@/components/main/Navbar';
import React, { Fragment } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import BasicModal from '@/components/common/BasicModal';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { getSession, signIn, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Fragment>
      <Navbar />
      <Wrapper>
        {!session ? (
          <BasicModal btnName={'로그인하기'}>
            <LoginWrapper>
              <Button onClick={() => signIn('google')}>구글로그인</Button>
            </LoginWrapper>
          </BasicModal>
        ) : undefined}
      </Wrapper>
    </Fragment>
  );
}

const LoginWrapper = styled(Box)`
  padding: 2rem;
`;

const Wrapper = styled(Box)`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;
