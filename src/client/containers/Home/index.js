import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import {FaTimesCircle} from 'react-icons/fa';
import {addBoard, deleteBoard, generateExampleBoard} from '../../actions/actionCreators';
import Button from '../../components/Button';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeTitle = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const StyledLink = styled(Link)`
  &:hover,
  &:focus,
  &:active {
    opacity: 0.85;
  }
`;

const StyledForm = styled.form`
  margin: 12px 0 0 0;
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledOr = styled.div`
  margin: 8px 0;
  font-size: 14px;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 400px;
  color: rgb(46, 68, 78);
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 8px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: inherit;
  outline: none;
  resize: none;
  font-size: 16px;
  margin-right: 12px;

  &:hover,
  &:focus,
  &:active {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`;

const List = styled.div`
  margin: 1rem 0;
  padding: 12px 12px 12px;
  background: #f8f8f8;
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
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 0;
`;

const StyledDeleteBoardButton = styled.button`
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  color: rgb(46, 68, 78);
  cursor: pointer;
  font-size: 16px;
  opacity: 0.8;

  &:hover,
  &:focus,
  &:active {
    color: #da3849;
    opacity: 1;
  }
`;

const Home = ({dispatch, boards}) => {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (event) => setNewBoardTitle(event.target.value);

  const handleAddBoard = (event, boardTitle) => {
    event.preventDefault();
    onAddBoard(boardTitle);
  };

  const handleDeleteBoard = (event, boardId) => {
    event.preventDefault();
    onDeleteBoard(boardId);
  };

  const handleGenerateExampleBoard = (event) => {
    event.preventDefault();
    onGenerateExampleBoard();
  };

  const onAddBoard = async (boardTitle) => {
    setIsLoading(true);
    await dispatch(addBoard({boardTitle})).then(() => {
      setNewBoardTitle('');
      setIsLoading(false);
    });
  };

  const onDeleteBoard = async (boardId) => {
    setIsLoading(true);
    await dispatch(deleteBoard({boardId})).then(() => {
      setIsLoading(false);
    });
  };

  const onGenerateExampleBoard = async () => {
    setIsLoading(true);
    await dispatch(generateExampleBoard()).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <StyledHome>
      <HomeTitle>Pick a board...</HomeTitle>
      <List>
        {boards.map((board) => (
          <Row key={`row-${board._id}`}>
            <StyledLink to={`board/${board._id}`}>{board.title}</StyledLink>
            <StyledDeleteBoardButton onClick={() => handleDeleteBoard(event, board._id)}>
              <FaTimesCircle size={18} />
            </StyledDeleteBoardButton>
          </Row>
        ))}
        <StyledForm onSubmit={(e) => handleAddBoard(e, newBoardTitle)}>
          <FormRow>
            <StyledInput value={newBoardTitle} onChange={(e) => handleTitleChange(e)} placeholder="Add a new board" />
            <Button variant="board" type="submit" value="Submit" text="Add" disabled={!newBoardTitle || isLoading} />
          </FormRow>
          <StyledOr>or</StyledOr>
          <Button
            variant="example"
            text="Generate Example Board"
            onClick={(e) => handleGenerateExampleBoard(e)}
            disabled={isLoading}
          />
        </StyledForm>
      </List>
    </StyledHome>
  );
};

const mapStateToProps = (state) => ({
  boards: Object.values(state.boardsById)
});

export default connect(mapStateToProps)(Home);
