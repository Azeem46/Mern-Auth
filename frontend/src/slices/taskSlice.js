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

    const response = await axios.get('/tasks', _);
    return response.data;
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (newTask, { getState }) => {
    const response = await axios.post('/tasks', newTask);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updates }) => {
    const response = await axios.patch(`/tasks/${id}`, updates);
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
        updateTaskLocally: (state, action) => {
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
    state.tasks = Array.isArray(action.payload) ? action.payload : []; // Ensure tasks is always an array
})
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                const index = state.tasks.findIndex(task => task._id === updatedTask._id);
                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskId = action.payload;
                state.tasks = state.tasks.filter(task => task._id !== taskId);
            });
    }
});

export const { addTask, updateTaskLocally } = tasksSlice.actions;

export default tasksSlice.reducer;