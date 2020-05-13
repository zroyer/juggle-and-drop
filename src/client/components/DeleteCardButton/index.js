import React from 'react';
import styled from 'styled-components';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';

const StyledDeleteCardButton = styled.button`
  padding: 0;
  position: absolute;
  top: 7.5px;
  right: 27px;
  border: 0;
  opacity: 0.1;
  cursor: pointer;
  font-size: 16px;
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
      <FaTimesCircle />
    </StyledDeleteCardButton>
  );
};

export default DeleteCardButton;
