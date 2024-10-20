import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const api = {
    getTodos: () => axios.get(API_URL),
    createTodo: (todo) => {
        const { id, dateCreated, dateUpdated, ...newTodo } = todo;
        return axios.post(API_URL, newTodo);
    },
    updateTodo: (id, todo) => {
        const { id: _, ...todoWithoutId } = todo;
        return axios.put(`${API_URL}/${id}`, todoWithoutId);
    },
    deleteTodo: (id) => axios.delete(`${API_URL}/${id}`)
}