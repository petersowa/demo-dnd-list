import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import Handle from './handle';

const Container = styled.div`
  display: flex;
  border: 1px solid var(--bg-link);
  border-radius: 0.4rem;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

export default function({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Handle {...provided.dragHandleProps}>
            <i class="material-icons">reorder</i>
          </Handle>
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}
