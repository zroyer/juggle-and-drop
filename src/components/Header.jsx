import React, { Component } from 'react';
import styled from 'styled-components';

const titleColor = '#FFFFFF';
const wrapperColor = '#1BAAA3'

const Wrapper = styled.div`
  background-color: ${props => props.wrapperColor ||  'grey'};
  color: ${props => props.titleColor ||  'white'};
  text-align: center;
  padding: 12px;
  font-weight: 500;
  font-size: 1.15rem;
`

class Header extends Component {
  render() {
    return (
      <Wrapper
        wrapperColor={wrapperColor}
        titleColor={titleColor}>
          Doing Things
      </Wrapper>
    );
  }
}

export default Header;
