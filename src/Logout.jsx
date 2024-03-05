import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import '@okta/okta-signin-widget/css/okta-sign-in.min.css';
import Spinner from './Spinner';

const Logout = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');

  useEffect(() => {
    try {
      oktaAuth.signOut({ postLogoutRedirectUri: redirect });
    } catch (err) {
      if (isCorsError(err)) {
        setCorsErrorModalOpen(true);
      } else {
        throw err;
      }
    }
  }, [authState, oktaAuth]);

  return <Spinner />;
};

export default Logout;
