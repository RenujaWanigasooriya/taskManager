import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList Component', () => {
  test('renders initial tasks', () => {
    render(<TaskList />);
    expect(screen.getByText(/Buy books/i)).toBeInTheDocument();
    expect(screen.getByText(/Clean home/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Done/)).toHaveLength(5); // 5 initial tasks
  });

  test('adds a new task', () => {
    render(<TaskList />);

    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'New Task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: 'This is a new task' },
    });

    fireEvent.click(screen.getByText(/Add/i));

    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('This is a new task')).toBeInTheDocument();
  });

  test('does not add a task if title is empty', () => {
    render(<TaskList />);

    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: 'Only description' },
    });

    fireEvent.click(screen.getByText(/Add/i));

    expect(screen.queryByText('Only description')).not.toBeInTheDocument();
  });

  test('toggles task completion (Done → Undo)', () => {
    render(<TaskList />);
    
    const doneButtons = screen.getAllByText('Done');
    fireEvent.click(doneButtons[0]);

    expect(screen.getAllByText('Undo')).toHaveLength(1);
    expect(screen.getAllByText('Done')).toHaveLength(4);
  });

  test('can toggle back to Done', () => {
    render(<TaskList />);
    
    const button = screen.getAllByText('Done')[0];
    fireEvent.click(button); // Mark as Done → Undo
    fireEvent.click(screen.getByText('Undo')); // Toggle back

    expect(screen.getAllByText('Done').length).toBe(5);
  });
});
