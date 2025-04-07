import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTask.title.trim()) return;

    try {
      await axios.post('http://localhost:8080/api/tasks', newTask);
      setNewTask({ title: '', description: '' });
      fetchTasks(); // Refresh task list after adding
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Left Side - Add Task */}
        <div style={styles.inputContainer}>
          <h3 style={{ marginBottom: '1rem' }}>Add a Task</h3>
          <input
            placeholder="Title"
            style={styles.input}
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            style={styles.textarea}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button style={styles.addButton} onClick={addTask}>Add</button>
        </div>

        {/* Right Side - Task List */}
        <div style={styles.taskContainer}>
          {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>{task.title}</strong>
                  <p style={{ margin: '0.3rem 0', color: '#333' }}>{task.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#f0f0f0',
    padding: '3rem',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '2rem',
    display: 'flex',
    maxWidth: '1000px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    gap: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '1rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc'
  },
  textarea: {
    padding: '1rem',
    fontSize: '1rem',
    height: '120px',
    marginBottom: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    resize: 'none'
  },
  addButton: {
    backgroundColor: '#0040ff',
    color: '#fff',
    border: 'none',
    padding: '0.9rem',
    fontSize: '1rem',
    borderRadius: '10px',
    cursor: 'pointer'
  },
  taskContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  taskCard: {
    backgroundColor: '#e2e2e2',
    padding: '1rem',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
  }
};

export default TaskList;
