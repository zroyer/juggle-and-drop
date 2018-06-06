import React, { Component } from 'react';
import styled from 'styled-components';

const StyledListTitleButton = styled.button`
  flex-grow: 1;
  padding: 10px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  background: #F8F8F8;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-top-left-radius: 3px;
`

class ListTitleButton extends Component {
  render() {
    return (
      <StyledListTitleButton {...this.props}>
        {this.props.text}
      </StyledListTitleButton>
    );
  }
}

export default ListTitleButton;
