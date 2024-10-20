<template>
    <div class="todo-card">
        <div class="todo-card-header">
            <h3>{{ todo.title }}</h3>
            <div>
                <button @click="$emit('update', todo)" class="icon edit-icon">Edit</button>
                <button @click="$emit('delete', todo.id)" class="icon delete-icon">Delete</button>
            </div>
        </div>
        <p>{{ todo.description }}</p>
        <p>Created: {{ formatDate(todo.dateCreated) }}</p>
        <p>Status: {{ todo.isDone ? 'Completed' : 'Not completed' }}</p>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
});

defineEmits(['update', 'delete']);

const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString();
};
</script>

<style scoped>
.todo-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #f9f9f9;
}

.todo-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon {
    cursor: pointer;
    margin-left: 10px;
    background: none;
    border: none;
    font-size: 1em;
}

.delete-icon {
    color: red;
}

.edit-icon {
    color: blue;
}
</style>