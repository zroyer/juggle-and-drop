import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Button from '../components/Button';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`

const HomeTitle = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`

const StyledLink = styled(Link)`
  margin-top: 1rem;
`

class Home extends Component<Props> {
  render = () => {
    const { boards } = this.props;
    return (
      <StyledHome>
        <Helmet>
          <title>juggle & drop</title>
        </Helmet>
        <HomeTitle>Pick a board...</HomeTitle>
        {boards.map(board => (
          <StyledLink
            to={`board/${board._id}`}
            >
              <Button key={board._id} text={board.title} style={{listStyle: "none"}} />
          </StyledLink>
          ))}
      </StyledHome>
    );
  };
}

const mapStateToProps = state => ({
  boards: Object.values(state.boardsById)
});

export default connect(mapStateToProps)(Home);
