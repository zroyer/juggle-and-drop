import React, { Component } from 'react';
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
  color: rgb(46,68,78);

  &:hover,
  &:focus,
  &:active {
    color: #DA3849;
    opacity: 1;
  }
`

class DeleteCardButton extends Component {
  render() {
    return (
      <StyledDeleteCardButton {...this.props}>
        <FaTimesCircle />
      </StyledDeleteCardButton>
    );
  }
}

export default DeleteCardButton;
