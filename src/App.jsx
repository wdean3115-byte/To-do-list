import React, { useState } from 'react';

const App = () => {
const styles = {
    
    container: {
    
      padding: '25px', 
      maxWidth: '450px', 
      margin: '40px auto', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f8f8',
      borderRadius: '12px',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ddd',
    },
   
    inputGroup: {
      display: 'flex', 
      marginBottom: '20px', 
      gap: '10px'
    },
    input: {
      padding: '12px 15px', 
      flexGrow: 1, 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      fontSize: '16px',
    },
    button: (bgColor) => ({
      padding: '12px 20px', 
      backgroundColor: bgColor, 
      color: 'white', 
      border: 'none', 
      borderRadius: '8px', 
      cursor: 'pointer',
      fontSize: '16px',
    }),
    filterButton: (isActive) => ({
      padding: '8px 15px',
      marginRight: '8px',
      border: isActive ? '2px solid #007bff' : '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: isActive ? '#e9f5ff' : 'white',
      color: isActive ? '#007bff' : '#555',
      cursor: 'pointer',
    }),
    taskItem: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '15px', 
      marginBottom: '10px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      borderLeft: '5px solid #007bff',
    },
    deleteButton: {
      backgroundColor: 'transparent',
      color: '#dc3545',
      border: 'none',
      cursor: 'pointer',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
   
    checkbox: {
        width: '20px',
        height: '20px',
        marginRight: '15px',
        cursor: 'pointer',
    }
  };

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');
  const addTask = (e) => {
    if (e) e.preventDefault(); 
    
    if (newTask.trim() !== '') {
      const newId = Date.now(); 
      
      const task = { id: newId, text: newTask.trim(), completed: false }; 
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

 
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true; 
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;



  
 return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>To Do List </h2>
      
      <form onSubmit={addTask} style={styles.inputGroup}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          style={styles.input}
        />
        <button type="submit" style={styles.button('#007bff')}>
          Add
        </button>
      </form>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '5px' }}>
        {['All', 'Active', 'Completed'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            style={styles.filterButton(filter === f)}
          >
            {f}
          </button>
        ))}
      </div>

      
      <div style={{ marginBottom: '20px' }}>
        {filteredTasks.map(task => (
          <div key={task.id} style={styles.taskItem}>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                style={styles.checkbox}
              />
              <span 
                style={{ 
                  textDecoration: task.completed ? 'line-through' : 'none', 
                  color: task.completed ? '#888' : '#333',
                  fontSize: '17px'
                }}
              >
                {task.text}
              </span>
            </div>
            
            <button 
              onClick={() => deleteTask(task.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <p style={{ color: 'gray', textAlign: 'center' }}> Add a task!!!!!!! </p>
        )}
      </div>

     
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid #eee' }}>
        <p style={{ fontSize: '14px', color: 'gray', margin: 0 }}>
          {completedCount} of {totalCount} tasks completed
        </p>
        
       
        {completedCount > 0 && (
          <button 
            onClick={clearCompleted}
            style={{ 
              backgroundColor: 'transparent',
              color: 'red',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Clear completed
          </button>
        )}
      </div>
      
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#aaa' }}>
        Powered by ME
      </p>
    </div>
  );
};

export default App;
