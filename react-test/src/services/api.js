import axios from 'axios'

const API_URL = 'http://localhost:3003/api/to-do'

export const getTodos = () => axios.get(`${API_URL}`)
export const createTodo = (todo) => axios.post(`${API_URL}`, todo)
export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, {
    title: todo.title,
    description: todo.description,
    isDone: todo.is_done
}).then(response => response.data)
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`)