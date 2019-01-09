import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import './index.css';

import * as serviceWorker from './serviceWorker';

import initialData from './data/initial-data';
import Column from './components/column';

// TaskApp Components
class TaskApp extends Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const srcColumn = source.droppableId;
    const desColumn = destination.droppableId;

    if (srcColumn === desColumn && destination.index === source.index) return;

    const column = this.state.columns[srcColumn];
    const newTaskIds = Array.from(column.taskIds).filter(
      id => id !== draggableId
    );
    newTaskIds.splice(destination.index, 0, draggableId);

    this.setState({
      columns: {
        ...this.state.columns,
        [srcColumn]: { ...column, taskIds: [...newTaskIds] },
      },
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<TaskApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
