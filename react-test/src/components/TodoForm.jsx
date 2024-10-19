import React, { useEffect, useState } from "react";

export const TodoForm = ({ onSubmit, initialData }) => {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        is_done: false
    })

    useEffect(() => {
        if (initialData) {
            setTodo(initialData)
        }
    }, [initialData])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setTodo(prevTodo => ({
            ...prevTodo,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            is_done: todo.is_done,
            date_rreated: todo.date_created
        })
        setTodo({ title: '', description: '', is_done: false })
    }
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={todo.title}
                onChange={handleChange}
                placeholder="Todo title"
                required
            />
            <textarea
                name="description"
                value={todo.description}
                onChange={handleChange}
                placeholder="Todo description"
                required
            />
            <label>
                Check if done.
                <input
                    type="checkbox"
                    name="is_done"
                    checked={todo.is_done}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">
                {initialData ? 'Update' : 'Add'}
            </button>
        </form>
    )
}