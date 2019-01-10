import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid var(--bg-link);
  border-radius: 0.4rem;
  padding: 0.4rem;
  background-color: silver;
`;
const Title = styled.h3`
  padding: 8px;
  background-color: white;
`;
const TaskList = styled.ul`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

// Column functional component
class Column extends React.Component {
  render() {
    const { column, tasks } = this.props;
    return (
      <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;
