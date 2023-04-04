import React, { Fragment } from 'react';
import Navbar from '@/components/users-portfolio/Navbar';
import Main from '@/components/users-portfolio/Main';
import About from '@/components/users-portfolio/About';
import Skills from '@/components/users-portfolio/Skills';
import Projects from '@/components/users-portfolio/Projects';
import Contact from '@/components/users-portfolio/Contact';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { usePortfoliosDetailQuery } from '@/react-query/query-hooks/usePortfoliosHook';

const UserPortfolio = ({ session }) => {
  const router = useRouter();
  const { portfolioId } = router.query;

  const {
    data: { imageSrc, title, description, about },
    isLoading,
  } = usePortfoliosDetailQuery(portfolioId);

  return (
    <Fragment>
      <Navbar portfolioName={'ddd'} />
      <Main />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session && !session?.accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default UserPortfolio;
