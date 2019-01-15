import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid var(--bg-link);
  border-radius: 0.4rem;
  padding: 0.4rem;
  background-color: silver;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow1);
`;
const Title = styled.h3`
  padding: 8px;
  background-color: white;
`;
const TaskList = styled.ul`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'silver' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  };

  render() {
    const { tasks } = this.props;
    return tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

// Column functional component
const Column = ({ column, tasks, index }) => (
  <Draggable draggableId={column.id} index={index} type="column">
    {provided => (
      <Container ref={provided.innerRef} {...provided.draggableProps}>
        <Title {...provided.dragHandleProps}>{column.title}</Title>
        <Droppable droppableId={column.id} type="task">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <InnerList tasks={tasks} />

              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )}
  </Draggable>
);

export default Column;
