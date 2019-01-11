const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Take out the garbage',
    },
    'task-2': {
      id: 'task-2',
      content: 'Watch tv show',
    },
    'task-3': {
      id: 'task-3',
      content: 'Charge my phone',
    },
    'task-4': {
      id: 'task-4',
      content: 'Cook dinner',
    },
    'task-5': {
      id: 'task-5',
      content: 'Walk the dog',
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Future',
      taskIds: [],
    },
    'column-5': {
      id: 'column-5',
      title: `Matt's`,
      taskIds: [],
    },
    'column-6': {
      id: 'column-6',
      title: `Peter's`,
      taskIds: [],
    },
  },
  columnOrder: [
    'column-1',
    'column-2',
    'column-3',
    'column-4',
    'column-5',
    'column-6',
  ],
};

export default initialData;
