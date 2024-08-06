// components/AddTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../slices/taskSlice';
import axios from 'axios';
import '../../public/css/AddTaks.css'; // Import the CSS file

const AddTask = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleAddClick = () => {
        setIsVisible(!isVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = JSON.parse(localStorage.getItem('userInfo'))._id;

        try {
            const response = await axios.post('/api/tasks', {
                title,
                description,
                user: userId,
                isCompleted: false
            });
            dispatch(addTask(response.data));
            setTitle('');
            setDescription('');
            setIsVisible(false);
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };

    return (
        <div className="add-task-container">
            <button className="add-task-button" onClick={handleAddClick}>
                {isVisible ? 'Cancel' : 'Add Task'}
            </button>
            {isVisible && (
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">
                            Title:
                            <input
                                type="text"
                                className="form-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label className="form-label">
                            Description:
                            <textarea
                                className="form-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddTask;
