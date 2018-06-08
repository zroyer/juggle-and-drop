import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const titleColor = '#FFFFFF';

const Wrapper = styled.div`
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledLinkText = styled.div`
  padding: 4px;
  color: ${props => props.titleColor ||  'white'};
  font-weight: 500;
  width: 50px;
  font-size: 0.85rem;
`;
const StyledLinkEmoji = styled.div`
  font-size: 2rem;
  padding: 4px;
`;

class Header extends Component {
  render() {
    console.log(this.props)
    return (
      <Wrapper
        titleColor={titleColor}>
          <StyledLink to={'/'}>
            <StyledLinkEmoji>🤹‍</StyledLinkEmoji>
            <StyledLinkText>juggle & drop</StyledLinkText>
          </StyledLink>
      </Wrapper>
    );
  }
}

export default Header;
