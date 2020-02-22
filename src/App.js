import React, { useEffect, useState } from 'react';
import AppContainer from './pages/AppContainer/AppContainer';
import Authenticate from './pages/Authenticate/Authenticate';
import './App.scss';

const App = () => {
  const [hueIp, setHueIp] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('hueIp') && localStorage.getItem('hueAuthToken')) {
      setHueIp(localStorage.getItem('hueIp'));
      setAuthToken(localStorage.getItem('hueAuthToken'));
    }
  }, []);

  const setAuth = (ip, token) => {
    localStorage.setItem('hueIp', ip);
    localStorage.setItem('hueAuthToken', token);
    setHueIp(ip);
    setAuthToken(token);
  }

  const resetAuth = () => {
    localStorage.removeItem('hueIp');
    localStorage.removeItem('hueAuthToken');
    setHueIp(null);
    setAuthToken(null);
  }

  const showAlertBox = async (title, hint, action) => {
    const willDelete = await swal({
      title,
      text: hint,
      icon: 'warning',
      dangerMode: true,
    });

    if (willDelete) {
      action();
    }
  };
  const showAlertWarning = (warning) => {
    swal(warning);
  }

  if (hueIp && authToken) {
    return (<AppContainer
      ip={hueIp}
      token={authToken}
      showAlertDialog={showAlertDialog}
      removeAuth={resetAuth}
    />)
  }

  return (
    <Authenticate
      setAuth={setAuth}
      showAlertWarning={showAlertWarning}
    />
  )
};

export default App;
