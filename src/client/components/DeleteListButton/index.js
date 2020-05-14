import React from 'react';
import styled from 'styled-components';
import {FaTimesCircle} from 'react-icons/fa';

const StyledDeleteListButton = styled.button`
  border: 0;
  padding: 0;
  margin-right: 10px;
  background: #f8f8f8;
  color: rgb(46, 68, 78);
  cursor: pointer;
  opacity: 0.8;

  &:hover,
  &:focus,
  &:active {
    color: #da3849;
    opacity: 1;
  }
`;

const DeleteListButton = ({...props}) => {
  return (
    <StyledDeleteListButton {...props}>
      <FaTimesCircle size={18} />
    </StyledDeleteListButton>
  );
};

export default DeleteListButton;
