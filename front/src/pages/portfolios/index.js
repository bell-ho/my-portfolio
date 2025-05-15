import React, { Children, Fragment, useState } from 'react';
import Navbar from '@/components/main/Navbar';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import { usePortfoliosQuery } from '@/react-query/query-hooks/usePortfoliosHook';
import BasicModal from '@/components/common/BasicModal';
import MakePortfolio from '@/components/main/MakePortfolio';
import Portfolio from '@/components/main/Portfolio';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';
import { withAuth } from '@/auth/withAuth';

const Portfolios = () => {
  const { data: session } = useSession();
  const { data: portfolios } = usePortfoliosQuery(session?.user?.id);

  return (
    <Fragment>
      <Navbar />
      <Wrapper>
        <BasicModal btnName={'만들기'}>
          <MakePortfolio />
        </BasicModal>
        <PortfoliosWrapper>
          {Children.toArray(portfolios?.map((v) => <Portfolio portfolio={v} />))}
        </PortfoliosWrapper>
      </Wrapper>
    </Fragment>
  );
};

const PortfoliosWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Wrapper = styled(Box)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const getServerSideProps = withAuth(async (context) => {
  const queryClient = new QueryClient();
  const { accessToken, user } = context.session;

  try {
    await Promise.all([
      queryClient.prefetchQuery([queryKey.portfoliosByUser, user?.id], async () => {
        const { data } = await axios.get(`${apiKey.portfolios}/users/${user?.id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data.data.portfolios;
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    return { notFound: true };
  }
});

export default Portfolios;
