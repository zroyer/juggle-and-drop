import React, { Component } from 'react';
import styled from 'styled-components';

const titleColor = '#FFFFFF';

const Wrapper = styled.div`
  color: ${props => props.titleColor ||  'white'};
  background-color: rgba(255, 255, 255, 0.2);
  text-align: center;
  padding: 12px;
  font-weight: 500;
  font-size: 1.15rem;
`

class Header extends Component {
  render() {
    return (
      <Wrapper
        titleColor={titleColor}>
          Doing Things
      </Wrapper>
    );
  }
}

export default Header;
