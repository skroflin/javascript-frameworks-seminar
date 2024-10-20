<template>
    <div class="todo-card">
        <div class="todo-card-header">
            <h3>{{ todo.title }}</h3>
            <div>
                <button @click="$emit('update', todo)" class="button edit-button">Edit</button>
                <button @click="$emit('delete', todo.id)" class="button delete-button">Delete</button>
            </div>
        </div>
        <hr>
        <p>{{ todo.description }}</p>
        <footer>
            <strong>Created:</strong>
            <p class="date">{{ formatDate(todo.dateCreated) }}</p>
            <strong>Status:</strong>
            <p v-if="todo.isDone" class="completed">Completed</p>
            <p v-else class="not-completed">Not completed</p>
        </footer>
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
    justify-content: space-around;
    align-items: center;
}

.button {
    cursor: pointer;
    margin-left: 5px;
    background: none;
    border: none;
    font-size: 1em;
}

.delete-button {
    color: red;
}

.delete-button:hover {
    color: darkred;
}

.edit-button {
    color: blue;
}

.edit-button:hover {
    color: darkblue;
}

.date {
    color: darkblue;
    font-style: italic;
}

.completed {
    color: darkgreen;
    font-size: 15px;
}

.not-completed {
    color: darkred;
    font-size: 15px;
}
</style>