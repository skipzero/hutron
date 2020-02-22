import React from 'react';
import AuthButton from '../AuthButton/AuthButton';
import './loaderSpinner.scss';

const LoaderSpinner = (props) => {
  if (props.isLoading) {

    return (
      <div className='loaderSpinnerWrapper'>
        <div className='lds-ripple'>
          <div />
          <div />
        </div>
        <div className='loaderSpinnerText'>Loading Hue resources</div>
      </div>
    );
  }

  return (
    <div className='loaderSpinnerWrapper'>
      <div className='loaderSpinnerText'>
        An error occured:
        <br />
        {props.failMessage}
      </div>
      <AuthButton hint='Re-authenticate Hue' onClick={props.backAction} />
    </div>
  );
};

export default LoaderSpinner;
