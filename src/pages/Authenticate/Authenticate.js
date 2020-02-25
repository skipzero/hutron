import React, { useState, useEffect } from 'react';
import * as service from '../../services/apiRequestors';
import AuthButton from '../../components/AuthButton/AuthButton';
import './Authenticate.scss';

const Authenticate = (props) => {
  const [inputIp, setInputIp] = useState('');
  const [devName, setDevName] = useState('');
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

  const validateInput = () => {
    const formattedIn = inputIp.replace(/[a-zA-Z]|:|\//g, '');


    if (!formattedIn) {
      props.showAlertWarning('Add Ip address of the Hue Bridge');
    }

    if (!validateIfIp(formattedIn)) {
      props.showAlertWarning('Wrong Ip, please reenter IP');
    }

    if (!devName) {
      props.showAlertWarning('Choose dev name for app');
      return;
    }

    if (!validateDevName(devName)) {
      props.showAlertWarning('Choose a different dev name');
    }

    startCounter();
    setInputIp(formattedIn);
  };

  const startAuthenticating = () => {
    const probe = setInterval(() => {
      if (authenticateWaiter) {
        authorizeUser();
      } else {
        clearInterval(probe);
      }
    }, 1500);
  };

  const authorizeUser = async () => {
    try {
      const result = await service.postJson(`http://${inputIp}/api`, {
        deviceType: `hutron#${devName}`,
      });

      Object.keys(result).forEach((key) => {
        if (key === 'success') {
          if (authenticateTimeout) {
            clearTimeout(authenticateTimeout);
          }
          props.setAuthentication(inputIp, result[0].success.username);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const renderInputs = () => (
    <div className='authContainer'>
      <div className='authHeadline'>
        Enter bridge IP...
      </div>
      <input
        value={inputIp}
        onChange={onInputIpChange(setDevName)}
        className='authInput'
        placeholder='enter developer name...'
      />

      <AuthButton onClick={validateInput} />
    </div>
  );

  const renderCounter = () => (
    <div className='authContainer'>
      <div className='counterLine'>
        <div className='counterProcess'></div>
      </div>

      <div className='bridgePushRow'>
        <div className='bridgePushIcon'></div>
        <div className='bridgePushText'>Press the button on the Hue Bridge to finish Authentication...</div>
      </div>
    </div>
  );

  const validateIfIp = (ifIp) => {
    let isIp = true;
    ifIp.split('.').forEach((group) => {
      const parsedNumber = Number(group);
      if (isNaN(parsedNumber) || parsedNumber < 0 || parsedNumber > 255) {
        isIp = false;
      }
    });
    return isIp;
  };

  const validateDevName = (name) => {
    return /^[a-zA-Z]+$/gm.test(name);
  }

  const startCounter = async () => {
    setAuthenticateWaiter(false);
    setAuthenticateTimeout(setTimeout(stopCounter, 15000));
  };

  const stopCounter = async () => {
    setAuthenticateWaiter(false);
    props.showAlertWarning('Hue Bridge failed to authenticate. Be sure to press the button on the bridge...');
  };

  if (authenticateWaiter) {
    return renderCounter();
  };

  return renderInputs();
};

export default Authenticate;
