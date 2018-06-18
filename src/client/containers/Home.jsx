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
  padding: 1rem;
`

class Home extends Component<Props> {
  render = () => {
    const { boards } = this.props;
    return (
      <StyledHome>
        <Helmet>
          <title>juggle & drop</title>
        </Helmet>
        <h2>Pick a board...</h2>
        {boards.map(board => (
          <Link
            to={`board/${board._id}`}
            >
              <Button key={board._id} text={board.title} style={{listStyle: "none"}} />
          </Link>
          ))}
      </StyledHome>
    );
  };
}

const mapStateToProps = state => ({
  boards: Object.values(state.boardsById)
});

export default connect(mapStateToProps)(Home);
