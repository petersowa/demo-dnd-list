import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import './index.css';

import * as serviceWorker from './serviceWorker';

import initialData from './data/initial-data';
import Column from './components/column';

const Container = styled.div`
  display: grid;
  width: max-content;
  grid-auto-columns: minmax(12rem, 20%);
  grid-auto-flow: column;
  background-color: ${props => (props.isDraggingOver ? 'red' : 'silver')};
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, index, taskMap } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return (
      <Column key={column.id} index={index} column={column} tasks={tasks} />
    );
  }
}

// TaskApp Components
class TaskApp extends Component {
  state = initialData;

  onDragStart = () => {
    //document.body.style.backgroundColor = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  };

  onDragUpdate = update => {
    console.log('drag update');
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
    ) {
      return;
    }

    if (result.type === 'column') {
      const columnOrder = Array.from(this.state.columnOrder);
      columnOrder.splice(source.index, 1);
      columnOrder.splice(destination.index, 0, draggableId);

      return this.setState({ columnOrder: [...columnOrder] });
    }

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
        <Droppable
          droppableId="all-columns"
          type="column"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];

                return (
                  <InnerList
                    key={column.id}
                    index={index}
                    column={column}
                    taskMap={this.state.tasks}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<TaskApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
