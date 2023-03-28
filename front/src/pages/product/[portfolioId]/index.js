import React, { Fragment } from 'react';
import Navbar from '@/components/users-portfolio/Navbar';
import Main from '@/components/portfolio-product/Main';
import About from '@/components/portfolio-product/About';
import { useRouter } from 'next/router';
import { usePortfoliosDetailQuery } from '@/react-query/query-hooks/usePortfoliosHook';
import Skills from '@/components/portfolio-product/Skills';
import { getSession } from 'next-auth/react';
import Projects from '@/components/portfolio-product/Projects';

const Product = ({ session }) => {
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
      <Skills userId={session?.user?.id} />
      <Projects portfolioId={portfolioId} />
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

export default Product;
