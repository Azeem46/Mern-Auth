// components/UpdateTaskModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../slices/taskSlice'; // Ensure correct path
import '../../public/css/UpdateTaskModal.css';; // Import CSS for the modal

const UpdateTaskModal = ({ task, onClose }) => {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [isCompleted, setIsCompleted] = useState(task.isCompleted || false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setIsCompleted(task.isCompleted);
        }
    }, [task]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateTask({ id: task._id, updates: { title, description, isCompleted } }));
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container show">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Update Task</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Completed:
                        <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(e) => setIsCompleted(e.target.checked)}
                        />
                    </label>
                    <button type="submit" className="submit-button">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTaskModal;