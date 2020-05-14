import React from 'react';
import styled from 'styled-components';
import {FaTimesCircle} from 'react-icons/fa';

const StyledDeleteCardButton = styled.button`
  padding: 0;
  position: relative;
  border: 0;
  opacity: 0.1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(46, 68, 78);

  &:hover,
  &:focus,
  &:active {
    color: #da3849;
    opacity: 1;
  }
`;

const DeleteCardButton = ({...props}) => {
  return (
    <StyledDeleteCardButton {...props}>
      <FaTimesCircle size={16} />
    </StyledDeleteCardButton>
  );
};

export default DeleteCardButton;
