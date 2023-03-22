import React, { Fragment } from 'react';
import Navbar from '@/components/users-portfolio/Navbar';
import Main from '@/components/users-portfolio/Main';
import About from '@/components/users-portfolio/About';
import Skills from '@/components/users-portfolio/Skills';

const UserPortfolio = () => {
  return (
    <Fragment>
      <Navbar />
      <Main />
      <About />
      <Skills />
    </Fragment>
  );
};
export default UserPortfolio;
