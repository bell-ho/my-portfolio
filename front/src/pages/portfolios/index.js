import React, { Children, Fragment, useState } from 'react';
import Navbar from '@/components/main/Navbar';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import { usePortfoliosQuery } from '@/react-query/query-hooks/usePortfoliosHook';
import BasicModal from '@/components/common/BasicModal';
import MakePortfolio from '@/components/main/MakePortfolio';
import Portfolio from '@/components/main/Portfolio';

const Portfolios = () => {
  const { data: session, status } = useSession();

  const { data: portfolios, isLoading } = usePortfoliosQuery(session?.user?.id);
  if (!portfolios) {
    return <div>Loading...</div>;
  }

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
export default Portfolios;
