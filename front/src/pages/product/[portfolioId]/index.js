import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Navbar from '@/components/users-portfolio/Navbar';
import Main from '@/components/portfolio-product/Main';
import About from '@/components/portfolio-product/About';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { usePortfoliosDetailQuery } from '@/react-query/query-hooks/usePortfoliosHook';

const Product = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { portfolioId } = router.query;

  const {
    data: { imageSrc, title, description, about },
    isLoading,
  } = usePortfoliosDetailQuery(portfolioId);

  return (
    <Fragment>
      <Navbar />
      <Main id={portfolioId} imageSrc={imageSrc} title={title} description={description} />
      <About id={portfolioId} name={about?.name} phone={about?.phone} email={about?.email} />
    </Fragment>
  );
};

const Wrapper = styled(Box)`
  background-color: #1d809f;
  padding: 2rem;
`;
export default Product;
