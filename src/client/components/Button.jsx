import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(46,68,78);
  line-height: 18px;
  border: none;
  transition-duration: 0.085s;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: ${props => props.list ? '5px' : '3px'};
  font-weight: ${props => props.list ? '600' : '500'};
  font-size: ${props => props.list ? '14px' : '13px'};
  margin: ${props => props.list ? '8px' : '0'};
  width: ${props => props.list ? '268px' : 'auto'};
  height: ${props => props.list ? '48px' : 'auto'};
  transition-timing-function: ease-in;
  background-color: ${props =>
    (props.card && '#fcd1f0')
    || (props.list && '#fcddd1')
    || (props.add && '#d1f7c4')
    || '#fff'
  };

  &:hover,
  &:focus,
  &:active {
    box-shadow: inset 0 0 0 2px rgba(0,0,0,0.2);
  }
`

class Button extends Component {
  render() {
    return (
      <StyledButton {...this.props}>
        {this.props.text}
      </StyledButton>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired
}

export default Button;
