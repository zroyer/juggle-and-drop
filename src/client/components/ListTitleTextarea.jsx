import React, { Component } from 'react';
import styled from 'styled-components';

const StyledListTitleTextarea = styled.textarea`
  box-shadow: inset 0 0 0 2px rgba(0,0,0,0.1);
  height: 32px;
  border-radius: 5px;
  border: none;
  padding: 8px;
  font-size: 14px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  color: inherit;
  resize: none;
`

class ListTitleTextarea extends Component {
  render() {
    return (
      <StyledListTitleTextarea {...this.props} />
    );
  }
}

export default ListTitleTextarea;
