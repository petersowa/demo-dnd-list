import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import './index.css';

import * as serviceWorker from './serviceWorker';

import initialData from './data/initial-data';
import Column from './components/column';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

// TaskApp Components
class TaskApp extends Component {
  state = initialData;

  onDragStart = () => {
    //document.body.style.backgroundColor = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  };

  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    document.body.style.backgroundColor = 'inherit';

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    const startColumn = this.state.columns[source.droppableId];
    const finishColumn = this.state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      return this.setState({
        columns: {
          ...this.state.columns,
          [source.droppableId]: { ...startColumn, taskIds: [...newTaskIds] },
        },
      });
    }

    const sourceTaskIds = Array.from(startColumn.taskIds);
    const destinationTaskIds = Array.from(finishColumn.taskIds);
    sourceTaskIds.splice(source.index, 1);
    destinationTaskIds.splice(destination.index, 0, draggableId);

    return this.setState({
      columns: {
        ...this.state.columns,
        [source.droppableId]: { ...startColumn, taskIds: [...sourceTaskIds] },
        [destination.droppableId]: {
          ...finishColumn,
          taskIds: [...destinationTaskIds],
        },
      },
    });
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
        onDragStart={this.onDragStart}
      >
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId]
            );
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<TaskApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
