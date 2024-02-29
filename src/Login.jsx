import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import '@okta/okta-signin-widget/css/okta-sign-in.min.css';
import { Form, Button, Message } from 'semantic-ui-react';
import Spinner from './Spinner';

const Login = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showform, setShowForm] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  const clientId = params.get('client_id');

  useEffect(() => {
    if(redirect){
      localStorage.setItem('redirect', redirect);
    }
    if (!authState) {
      // When user isn't authenticated, forget any user info
      
    } else {
      console.log(authState);
      if(authState.isAuthenticated){
        //get redirect from localstorage and redirect to that value
        const redirect = localStorage.getItem('redirect');
        if (redirect) {
          localStorage.removeItem('redirect');
          window.location=redirect;
        }
      }else{
        setShowForm(true);
      }
    }
  }, [authState, oktaAuth]);

  const handleLogin = async() => {
    sessionStorage.clear();
    if (!username || !password) {
      setError('Please enter both username and password.');
    } else {
      setLoading(true);
      try{
        const auth = await oktaAuth.signInWithCredentials({
          username: username,
          password: password
        })
        console.log(auth);
        const {sessionToken} = auth;
        if(!sessionToken){
          setLoading(false);
          setError("Invalid username or password.");
        }else{ 
          if(clientId){
            oktaAuth.signInWithRedirect({sessionToken,redirectUri:redirect,clientId});
          }else{
            oktaAuth.signInWithRedirect({sessionToken});
          }
        }
      }catch(err){
        setLoading(false);
        setError(err.message);
      }
    }
  }

  if (loading || !authState || !showform) {
    return <Spinner />;
  }

  return (
    <> 
      {showform &&
        <Form>
          <h2>Login</h2>
          <Form.Field>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <Button onClick={handleLogin}>Login</Button>
          {error && <Message negative>{error}</Message>}
        </Form>
      }
    </>
  );
};

export default Login;
