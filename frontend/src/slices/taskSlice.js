// slices/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    tasks: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
};

// Async thunk to fetch tasks for a user
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
    const { userInfo } = getState().auth;
    if (!userInfo) throw new Error('User not logged in');

    const response = await axios.get(`/api/tasks?user=${userInfo._id}`);
    return response.data;
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (newTask, { getState }) => {
    const response = await axios.post('/api/tasks', newTask);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    return taskId;
});


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const { id, updates } = action.payload;
            const existingTask = state.tasks.find(task => task._id === id);
            if (existingTask) {
                Object.assign(existingTask, updates);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            });
    }
});

export const { addTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;