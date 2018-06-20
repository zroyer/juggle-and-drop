import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { deleteBoard } from '../actions/actionCreators';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
`

const HomeTitle = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`

const StyledLink = styled(Link)`
  &:hover,
  &:focus,
  &:active {
    opacity: 0.85;
  }
`

const List = styled.div`
  margin-top: 1rem;
  padding: 12px 12px 12px;
  background: #F8F8F8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  width: 500px;

  @media (max-width: 768px) {
    width: 320px;
    font-size: 14px;
  }
`

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding: 12px 0;
`

const StyledDeleteBoardButton = styled.button`
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  color: rgb(46,68,78);
  cursor: pointer;
  font-size: 16px;
  opacity: 0.8;

  &:hover,
  &:focus,
  &:active {
    color: #DA3849;
    opacity: 1;
  }
`

class Home extends Component<Props> {
  deleteBoard = boardId => {
    const { dispatch } = this.props;
    dispatch(deleteBoard(boardId));
  };

  render = () => {
    const { boards } = this.props;
    return (
      <StyledHome>
        <Helmet>
          <title>juggle & drop</title>
        </Helmet>
        <HomeTitle>Pick a board...</HomeTitle>
        <List>
          {boards.map(board => (
            <Row key={`row-${board._id}`}>
              <StyledLink
                to={`board/${board._id}`}
                key={board._id}
                >
                  {board.title}
              </StyledLink>
              <StyledDeleteBoardButton
                key={`delete-${board._id}`}
                onClick={() => this.deleteBoard(board._id)}
                >
                <FaTimesCircle />
              </StyledDeleteBoardButton>
            </Row>
          ))}
        </List>
      </StyledHome>
    );
  };
}

const mapStateToProps = state => ({
  boards: Object.values(state.boardsById)
});

export default connect(mapStateToProps)(Home);
