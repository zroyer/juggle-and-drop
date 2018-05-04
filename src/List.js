import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './List.css';

const getThings = (count, offset = 0) =>
Array.from({ length: count }, (v, k) => k).map(k => ({
  id: `thing-${k + offset}`,
  content: `thing ${k + offset}`
}));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getThingStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',

  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  margin: grid * 4,
  width: 250,
});

class App extends Component {
  state = {
    things: getThings(10),
    selected: getThings(5, 10)
  };

  id2List = {
    droppable: 'things',
    droppable2: 'selected'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const things = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { things };

      if (source.droppableId === 'droppable2') {
        state = { selected: things };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        things: result.droppable,
        selected: result.droppable2
      });
    }
  };

  render() {
    return (
      <div className="content">
        <h2>Doing Things</h2>
        <div className="dnd-container">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="list-container">
              <h3>Things To Do</h3>
              <Droppable droppableId="droppable-todo">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {this.state.things.map((thing, index) => (
                      <Draggable
                        key={thing.id}
                        draggableId={thing.id}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getThingStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}>
                            {thing.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className="list-container">
              <h3>Things Done</h3>
              <Droppable droppableId="droppable-done">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {this.state.selected.map((thing, index) => (
                      <Draggable
                        key={thing.id}
                        draggableId={thing.id}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getThingStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}>
                            {thing.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default App;
