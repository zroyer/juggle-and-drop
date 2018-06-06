import React, { Component } from 'react';
import styled from 'styled-components';
import FaEdit from 'react-icons/lib/fa/edit';

const StyledEditCardButton = styled.button`
  padding: 0;
  position: absolute;
  top: 8.5px;
  right: 8px;
  border: 0;
  opacity: 0.1;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(46,68,78);

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }
`

class EditCardButton extends Component {
  render() {
    return (
      <StyledEditCardButton {...this.props}>
        <FaEdit />
      </StyledEditCardButton>
    );
  }
}

export default EditCardButton;
