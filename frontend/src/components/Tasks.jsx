// components/Tasks.js
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../slices/taskSlice'; // Corrected import path
import { useEffect } from 'react';
import './tasks.css'; // Import the CSS file

const Tasks = () => {
    const dispatch = useDispatch();
    const { tasks, status, error } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    if (status === 'loading') return <p>Loading tasks...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div className="tasks-container">
            <h1>Task List</h1>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task._id} className="task-item">
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                        <p className="task-status">Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(task._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
