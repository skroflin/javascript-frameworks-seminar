<template>
    <div class="todo-list">
        <h2>Todo list</h2>
        <TodoForm :initialTodo="editingTodo" @submit="handleSubmit" />
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else class="todo-cards">
            <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" @update="startEditing" @delete="handleDelete" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../service/api';
import TodoForm from './TodoForm.vue';
import TodoCard from './TodoCard.vue';

const todos = ref([]);
const editingTodo = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchTodos = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await api.getTodos();
        if (response.data && Array.isArray(response.data.data)) {
            todos.value = response.data.data;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (err) {
        console.error('Error fetching todos:', err);
        error.value = 'Failed to fetch todos. Please try again.';
    } finally {
        loading.value = false;
    }
};

const handleSubmit = async (todo) => {
    try {
        let response
        if (todo.id) {
            response = await api.updateTodo(todo.id, todo);
        } else {
            response = await api.createTodo(todo);
        }
        editingTodo.value = null;
        fetchTodos();
    } catch (err) {
        console.error('Error saving todo:', err);
        if (err.response) {
            console.error('Response data:', err.response.data);
            console.error('Response status:', err.response.status);
            console.error('Response headers:', err.response.headers);
        }
        error.value = 'Failed to save todo. Please try again.';
    }
};

const startEditing = (todo) => {
    editingTodo.value = { ...todo };
};

const handleDelete = async (id) => {
    try {
        await api.deleteTodo(id);
        todos.value = todos.value.filter(todo => todo.id !== id);
    } catch (err) {
        console.error('Error deleting todo:', err);
        error.value = 'Failed to delete todo. Please try again.';
    }
};

onMounted(fetchTodos);
</script>


<style scoped>
.todo-list {
    margin-top: 20px;
}

.todo-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}
</style>