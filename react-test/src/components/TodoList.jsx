import React, { useState, useEffect } from "react";
import { TodoCard } from "./TodoCard";
import { TodoForm } from "./TodoForm";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";

export const TodoList = () => {
    const [todos, setTodos] = useState([])
    const [editingTodo, setEditingTodo] = useState(null)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            const response = await getTodos()
            setTodos(response.data)
        } catch (error) {
            console.error('Error fetching todos:', error)
        }
    }

    const handleCreate = async (newTodo) => {
        try {
            await createTodo(newTodo)
            fetchTodos()
        } catch (error) {
            console.error('Error creating new todo:', error)
        }
    }

    const handleUpdate = async (updatedTodo) => {
        try {
            const response = await updateTodo(updatedTodo.id, updatedTodo)
            setEditingTodo(null)
            fetchTodos(prevTodo => prevTodo.map(todo =>
                todo.id === response.data.id ? response.data : todo
            ))
        } catch (error) {
            console.error('Error updating todo:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id)
            setTodos(prevTodo => prevTodo.filter(todo => todo.id !== id))
        } catch (error) {
            console.error('Error deleting todo:', error)
        }
    }
    return (
        <div className="todo-list">
            <TodoForm onSubmit={editingTodo ? handleUpdate : handleCreate} initialData={editingTodo} />
            <hr />
            <div className="todo-cards">
                {todos.map(todo => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onDelete={handleDelete}
                        onUpdate={() => setEditingTodo(todo)}
                    />
                ))}
            </div>
        </div>
    )
}