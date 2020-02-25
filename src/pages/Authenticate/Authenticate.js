import React, { useState, FormEvent, useEffect } from 'react';
import * as service from '../../services/apiRequestors';
import AuthButton from '../../components/AuthButton/AuthButton';
import 'Authenticate.scss';

const Authenticate = (props) => {
  const [inputIp, setInnputIp] = useState('');
  const [inputDevName, setInputDev] = useState('');
  const [authenticateWaiter, setAuthenticateWaiter] = useState(false);
  const [authenticateTimeout, setAuthenticateTimeout] = useState(null);

  useEffect(() => {
    startAuthenticating();
  }, [authenticateWaiter]);

  const onInputIpChange = (inputChange) => {
    return (e) => {
      inputChange(e.currentTarget.value);
    };
  };

  return props;
}

export default Authenticate;
