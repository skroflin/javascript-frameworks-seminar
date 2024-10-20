<template>
    <form @submit.prevent="onSubmit" class="todo-form">
        <input v-model="todoData.title" placeholder="Title" required>
        <textarea v-model="todoData.description" placeholder="Description" required></textarea>
        <label>
            <input type="checkbox" v-model="todoData.isDone">
            Completed
        </label>
        <button type="submit">{{ todoData.id ? 'Update' : 'Add' }} Todo</button>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    initialTodo: Object
});

const emit = defineEmits(['submit']);

const todoData = ref({
    id: null,
    title: '',
    description: '',
    isDone: false
});

watch(() => props.initialTodo, (newVal) => {
    if (newVal) {
        todoData.value = { 
            id: newVal.id,
            title: newVal.title,
            description: newVal.description,
            isDone: newVal.isDone
         };
    } else {
        todoData.value = { id: null, title: '', description: '', isDone: false };
    }
}, { immediate: true });

const onSubmit = () => {
    const newTodo = {
        id: todoData.value.id,
        title: todoData.value.title,
        description: todoData.value.description,
        isDone: todoData.value.isDone
    };
    emit('submit', newTodo);
};
</script>


<style>
.todo-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.todo-form input[type="text"],
.todo-form textarea {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.todo-form button {
    padding: 8px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.todo-form button:hover {
    background-color: #45a049;
}
</style>