import React from 'react';
import onClickOutside from 'react-onclickoutside';

const ClickOutsideWrapper = ({children, handleClickOutside}) => {
  handleClickOutside = () => handleClickOutside();
  return children;
};

export default onClickOutside(ClickOutsideWrapper);
