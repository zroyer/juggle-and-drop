import React, { Component } from 'react';
import styled from 'styled-components';

const titleColor = '#FFFFFF';
const navbarHeight = '50px';

const Wrapper = styled.div`
  color: ${props => props.titleColor ||  'white'};
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
