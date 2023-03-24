import React, { Fragment } from 'react';
import Navbar from '@/components/users-portfolio/Navbar';
import Main from '@/components/users-portfolio/Main';
import About from '@/components/users-portfolio/About';
import Skills from '@/components/users-portfolio/Skills';
import Projects from '@/components/users-portfolio/Projects';
import Contact from '@/components/users-portfolio/Contact';

const UserPortfolio = () => {
  return (
    <Fragment>
      <Navbar />
      <Main />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </Fragment>
  );
};
export default UserPortfolio;
