import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Github from 'react-icons/lib/fa/github';

const titleColor = '#FFFFFF';

const Wrapper = styled.div`
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.1111111111111112rem;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HomeLinkText = styled.div`
  padding: 4px;
  color: ${props => props.titleColor ||  'white'};
  font-weight: 500;
  width: 50px;
  font-size: 0.85rem;
`;

const HomeLinkEmoji = styled.div`
  font-size: 2rem;
  padding: 4px;
`;

const GithubLink = styled.a`
  color: white;
  height: 50px;
  width: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover,
  &:focus,
  &:active {
    opacity: 0.8;
  }
`;

class Header extends Component {
  render() {
    return (
      <Wrapper
        titleColor={titleColor}>
          <HomeLink to="/">
            <HomeLinkEmoji>
              <span role="img" aria-label="juggler">🤹‍</span>
            </HomeLinkEmoji>
            <HomeLinkText>juggle & drop</HomeLinkText>
          </HomeLink>
          <GithubLink href="https://github.com/zroyer/juggle-and-drop" target="_blank">
            <Github size={20}/>
          </GithubLink>
      </Wrapper>
    );
  }
}

export default Header;
