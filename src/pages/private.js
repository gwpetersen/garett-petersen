import React from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import PrivateGallery from '../components/privateGallery';
import { isLoggedIn } from '../services/auth';

export default () => (
  <Layout>
    {isLoggedIn() ? (
      <PrivateGallery />
    ) : navigate('/login')}
  </Layout>
);
