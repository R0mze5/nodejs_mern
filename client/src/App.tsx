import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth, IUseAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  const { login, logout, token, userId, ready }: IUseAuth = useAuth();
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <div>Loading</div>;
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <Container maxWidth='sm'>{routes}</Container>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
