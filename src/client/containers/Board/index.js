import React, {useState} from 'react';
import {connect} from 'react-redux';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import List from '../List';
import ListAdder from '../../components/ListAdder';
import {addList, reorderList, reorderBoard} from '../../actions/actionCreators';

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 111px);
  overflow-x: auto;
  overflow-y: auto;

  @media (max-width: 1436px) {
    align-items: ${(props) => props.numLists > 3 && 'self-start'};
  }

  @media (max-width: 1152px) {
    align-items: ${(props) => props.numLists > 2 && 'self-start'};
  }

  @media (max-width: 868px) {
    align-items: ${(props) => props.numLists > 1 && 'self-start'};
  }

  @media (max-width: 768px) {
    align-items: center;
    height: 100%;
  }
`;

const BoardTitle = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`;

const BoardTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ListsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Board = ({dispatch, lists, boardTitle, boardId}) => {
  const [showListAdder, setShowListAdder] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const handleDragEnd = ({draggableId, source, destination, type}) => {
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'COLUMN') {
      dispatch(
        reorderBoard({
          listId: draggableId,
          sourceId: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index
        })
      );
      return;
    } else {
      dispatch(
        reorderList({
          cardId: draggableId,
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          boardId
        })
      );
    }
  };

  const onAddList = async () => {
    await dispatch(
      addList({
        listTitle: newListTitle,
        boardId
      })
    ).then(() => {
      setShowListAdder(false);
      setNewListTitle('');
    });
  };

  return (
    <React.Fragment>
      <BoardTitleWrapper>
        <BoardTitle>{boardTitle}</BoardTitle>
      </BoardTitleWrapper>
      <StyledBoard numLists={lists.length}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
            {(droppableProvided) => (
              <ListsWrapper ref={droppableProvided.innerRef}>
                {lists.map((list, index) => (
                  <Draggable key={list._id} draggableId={list._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        data-react-beautiful-dnd-draggable="0"
                        data-react-beautiful-dnd-drag-handle="0">
                        <List list={list} boardId={boardId} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
                {lists.length < 5 && (
                  <ListAdder
                    numLeft={5 - lists.length}
                    onAddList={onAddList}
                    showListAdder={showListAdder}
                    setShowListAdder={setShowListAdder}
                    newListTitle={newListTitle}
                    setNewListTitle={setNewListTitle}
                  />
                )}
              </ListsWrapper>
            )}
          </Droppable>
        </DragDropContext>
      </StyledBoard>
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  const {boardId} = props.match.params;
  const board = state.boardsById[boardId];
  return {
    lists: board.lists.map((listId) => state.listsById[listId]),
    boardTitle: board.title,
    boardId
  };
};

export default connect(mapStateToProps)(Board);
