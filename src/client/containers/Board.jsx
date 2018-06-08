import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import List from './List';
import ListAdder from '../components/ListAdder';
import './Board.css';

type Props = {
  lists: Array<{ id: string }>,
  boardTitle: string,
  boardId: string,
  dispatch: ({ type: string }) => void
};

const StyledBoard = styled.div`
  display: flex;
  justify-content: center;

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

class Board extends React.Component<Props> {
  handleDragEnd = ({ source, destination, type }) => {
    if (!destination) {
      return;
    }
    const { dispatch } = this.props;

    if (type === "COLUMN") {
      dispatch({
        type: "REORDER_BOARD",
        payload: {
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index
        }
      });
      return;
    }

    dispatch({
      type: "REORDER_LIST",
      payload: {
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }
    });
  };
  render = () => {
    const { lists, boardTitle, boardId } = this.props;
    return (
      <StyledBoard numLists={lists.length}>
        <Helmet>
          <title>Doing Things // {boardTitle}</title>
        </Helmet>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
            {droppableProvided => (
              <div className="lists-wrapper" ref={droppableProvided.innerRef}>
                {lists.map((list, index) => (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {provided => (
                      <React.Fragment>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          data-react-beautiful-dnd-draggable="0"
                          data-react-beautiful-dnd-drag-handle="0"
                        >
                          <List list={list} boardId={boardId} style={{height: 'initial'}}/>
                        </div>
                        {provided.placeholder}
                      </React.Fragment>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}

                {/* Let's try capping this at 5 lists */}
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
  const board = state.boards[boardId];
  return {
    lists: board.lists.map(listId => state.lists[listId]),
    boardTitle: board.title,
    boardId
  };
};

export default connect(mapStateToProps)(Board);
