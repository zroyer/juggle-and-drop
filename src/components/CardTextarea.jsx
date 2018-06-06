import React, { Component } from 'react';
import styled from 'styled-components';

const StyledCardTextarea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgba(0,0,0,0.1);
  border: none;
  padding: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  outline: none;
  resize: none;
`

class CardTextarea extends Component {
  render() {
    return (
      <StyledCardTextarea {...this.props} />
    );
  }
}

export default CardTextarea;
