import React from 'react';
import './AuthButton.scss';

const AuthButton = (props) => {
  const buttonStyle = props.disabled ? 'authButton disabled' : 'authButton';

  const handleClick = () => {
    if (!props.disabled) {
      props.onClick();
    }
  };

  return (
    <div className={buttonStyle} onClick={handleClick}>
      {props.hint}
    </div>
  )
}


export default AuthButton;
