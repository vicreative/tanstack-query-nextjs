import React from 'react';
import NotFound from '@components/NotFound';
import Navbar from '@components/Navbar/index';
import Footer from '@components/Footer/Footer';

const NotFoundPage = () => {
  return (
    <main>
      <Navbar />
      <NotFound />
      <Footer />
    </main>
  );
};

export default NotFoundPage;
