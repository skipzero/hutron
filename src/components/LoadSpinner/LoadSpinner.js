import React from 'react';
import AuthButton from '../AuthButton/AuthButton';
import './LoadSpinner.scss';

const LoadSpinner = (props) => {
  if (props.isLoading) {

    return (
      <div className='loadSpinnerWrapper'>
        <div className='lds-ripple'>
          <div />
          <div />
        </div>
        <div className='loadSpinnerText'>Loading Hue resources</div>
      </div>
    );
  }

  return (
    <div className='loadSpinnerWrapper'>
      <div className='loadSpinnerText'>
        An error occured:
        <br />
        {props.failMessage}
      </div>
      <AuthButton hint='Re-authenticate Hue' onClick={props.backAction} />
    </div>
  );
};

export default LoadSpinner;
