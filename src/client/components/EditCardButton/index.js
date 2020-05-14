import React from 'react';
import styled from 'styled-components';
import {FaEdit} from 'react-icons/fa';

const StyledEditCardButton = styled.button`
  position: relative;
  padding: 0;
  margin: 0 0 1.5px 4px;
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
    opacity: 1;
  }
`;

const EditCardButton = ({...props}) => {
  return (
    <StyledEditCardButton {...props}>
      <FaEdit size={18} />
    </StyledEditCardButton>
  );
};

export default EditCardButton;
