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

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    this.setState({
      columns: {
        ...this.state.columns,
        [source.droppableId]: { ...column, taskIds: [...newTaskIds] },
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
