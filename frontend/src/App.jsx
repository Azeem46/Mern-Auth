import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <>
      <Header />
      <ToastContainer />
        <ThemeToggle />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
