import React from 'react';
import './Menu.scss';

const Menu = (props) => {
  const renderMenuItems = () => {
    return props.menuItems.map((item, index) => {
      const handleMenuClick = () => {
        props.menuClick(index);
      };
      return (
        <MenuItem
          key={item.name + item.active}
          isActive={props.menuSelected === index}
          menuClick={handleMenuClick}
          label={item.name}
        />
      )
    });
  };
  return <div className="mainMenuWrapper"> {renderMenuItems()}</div>
};


const MenuItem = (props) => {
  const classes = props.isActive ? 'mainMenuItem mainMenuItemActive' : 'mainMenuItem';

  return (
    <div onClick={props.menuClick} className={classes}>
      {props.label}
    </div>
  );
};

export default Menu;
