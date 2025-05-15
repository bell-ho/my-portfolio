import React, { Fragment } from 'react';
import Navbar from '@/components/main/Navbar';
import Main from '@/components/portfolio-product/Main';
import About from '@/components/portfolio-product/About';
import { useRouter } from 'next/router';
import { usePortfoliosDetailQuery } from '@/react-query/query-hooks/usePortfoliosHook';
import Skills from '@/components/portfolio-product/Skills';
import Projects from '@/components/portfolio-product/Projects';
import { withAuth } from '@/auth/withAuth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';

const Product = ({ session }) => {
  const router = useRouter();
  const { portfolioId } = router.query;

  const {
    data: { imageSrc, title, description, about },
  } = usePortfoliosDetailQuery(portfolioId);

  return (
    <Fragment>
      <Navbar />
      <Main id={portfolioId} imageSrc={imageSrc} title={title} description={description} />
      <About id={portfolioId} name={about?.name} phone={about?.phone} email={about?.email} />
      <Skills userId={session?.user?.id} />
      <Projects portfolioId={portfolioId} />
    </Fragment>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  const queryClient = new QueryClient();

  const { accessToken, user } = context.session;
  const { portfolioId } = context.query;

  try {
    await Promise.all([
      queryClient.prefetchQuery([queryKey.portfolios, portfolioId], async () => {
        const { data } = await axios.get(`${apiKey.portfolios}/${portfolioId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data.data.portfolio;
      }),
      queryClient.prefetchQuery([queryKey.stacksByUser, user?.id], async () => {
        const { data } = await axios.get(`${apiKey.stacks}/users/${user?.id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data.data.stacks;
      }),
      queryClient.prefetchQuery([queryKey.projectsByPortfolio, portfolioId], async () => {
        const { data } = await axios.get(`${apiKey.projects}/portfolios/${portfolioId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data.data.projects;
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

export default Product;
