import * as React from 'react';
import { Fragment} from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';
import ListAdder from './ListAdder';
import './Board.css';

type Props = {
  lists: Array<{ id: string }>,
  boardTitle: string,
  boardId: string,
  dispatch: ({ type: string }) => void
};

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
      <div className="board">
        <Helmet>
          <title>Doing Things // {boardTitle}</title>
        </Helmet>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
            {droppableProvided => (
              <div className="lists" ref={droppableProvided.innerRef}>
                {lists.map((list, index) => (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {provided => (
                      <Fragment>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          data-react-beautiful-dnd-draggable="0"
                          data-react-beautiful-dnd-drag-handle="0"
                          style={{ height: "100%" }}
                        >
                          <List list={list} boardId={boardId} />
                        </div>
                        {provided.placeholder}
                      </Fragment>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
                <ListAdder boardId={boardId} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
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
