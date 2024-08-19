import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../slices/taskSlice';
import { useEffect, useState } from 'react';
import UpdateTaskModal from './UpdateTaskModal';
import '../../public/css/tasks.css'; // Import the CSS file
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons

const Tasks = () => {
    const dispatch = useDispatch();
    const { tasks = [], status, error } = useSelector((state) => state.tasks);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    const handleUpdateClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    if (status === 'loading') return <p>Loading tasks...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
    if (!Array.isArray(tasks)) return <p>Tasks data is not available.</p>; // Fallback check

    return (
        <div className="tasks-container">
            <h1>Task List</h1>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task._id} className="task-item">
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                        <p className="task-status">Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
                        <div className="task-actions">
                            <button
                                className="update-button"
                                onClick={() => handleUpdateClick(task)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(task._id)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <UpdateTaskModal 
                    task={selectedTask} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default Tasks;
