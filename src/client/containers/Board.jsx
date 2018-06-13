import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import List from './List';
import ListAdder from '../components/ListAdder';
import { reorderList, reorderBoard } from '../actions/actionCreators';

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1436px) {
    justify-content: ${props => props.numLists > 3 && 'flex-start'};
  }

  @media (max-width: 1152px) {
    justify-content: ${props => props.numLists > 2 && 'flex-start'};
  }

  @media (max-width: 868px) {
    justify-content: ${props => props.numLists > 1 && 'flex-start'};
  }

  @media (max-width: 768px) {
    justify-content: center;
    height: 100%;
  }
`

const BoardTitle = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`

class Board extends React.Component<Props> {
  handleDragEnd = ({ draggableId, source, destination, type }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, boardId } = this.props;

    if (type === "COLUMN") {
      dispatch(
        reorderBoard(
          draggableId,
          source.droppableId,
          source.index,
          destination.index
        )
      );
      return;
    }
    dispatch(
      reorderList(
        draggableId,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        boardId
      )
    );
  };
  render = () => {
    const { lists, boardTitle, boardId } = this.props;
    return (
      <StyledBoard>
        <Helmet>
          <title>juggle & drop</title>
        </Helmet>
        <BoardTitle>{boardTitle}</BoardTitle>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
            {droppableProvided => (
              <div className="lists-wrapper" ref={droppableProvided.innerRef}>
                {lists.map((list, index) => (
                  <Draggable
                    key={list._id}
                    draggableId={list._id}
                    index={index}
                  >
                    {provided => (
                      <>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          data-react-beautiful-dnd-draggable="0"
                          data-react-beautiful-dnd-drag-handle="0"
                        >
                          <List
                            list={list}
                            boardId={boardId}
                            style={{height: 'initial'}}
                          />
                        </div>
                        {provided.placeholder}
                      </>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
                {lists.length < 5 &&
                  <ListAdder boardId={boardId} numLeft={5-lists.length} style={{height: 'initial'}}/>
                }
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </StyledBoard>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const board = state.boardsById[boardId];
  return {
    lists: board.lists.map(listId => state.listsById[listId]),
    boardTitle: board.title,
    boardId
  };
};

export default connect(mapStateToProps)(Board);
