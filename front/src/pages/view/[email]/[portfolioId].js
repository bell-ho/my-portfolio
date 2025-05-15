import React, { Fragment } from 'react';
import Navbar from '@/components/users-portfolio/Navbar';
import Main from '@/components/users-portfolio/Main';
import About from '@/components/users-portfolio/About';
import Skills from '@/components/users-portfolio/Skills';
import Projects from '@/components/users-portfolio/Projects';
import Contact from '@/components/users-portfolio/Contact';
import { useRouter } from 'next/router';
import { usePortfolioInfoQuery } from '@/react-query/query-hooks/usePortfoliosHook';
import { withAuth } from '@/auth/withAuth';
import { queryKey } from '@/react-query/constants';
import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const UserPortfolio = () => {
  const router = useRouter();
  const { portfolioId } = router.query;

  const {
    data: { name, imageSrc, title, description, about, userSkills, projects },
  } = usePortfolioInfoQuery(portfolioId);

  return (
    <Fragment>
      <Navbar portfolioName={name} />
      <Main imageSrc={imageSrc} title={title} description={description} />
      <About about={about} />
      <Skills skills={userSkills} />
      <Projects projects={projects} />
      <Contact />
    </Fragment>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  const queryClient = new QueryClient();

  const { accessToken } = context.session;
  const { portfolioId } = context.query;

  try {
    await Promise.all([
      queryClient.prefetchQuery([queryKey.portfolioInfo, portfolioId], async () => {
        const { data } = await axios.get(`${apiKey.portfolios}/info/${portfolioId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data.data.portfolio;
      }),
    ]);

    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (e) {
    return { notFound: true };
  }
});

export default UserPortfolio;
