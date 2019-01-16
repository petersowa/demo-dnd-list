import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--bg-link);
  border-radius: 0.4rem;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  box-shadow: 10px 10px 34px 0px rgba(0, 0, 0, 0.75);
`

export default function({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index} type="task">
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}
