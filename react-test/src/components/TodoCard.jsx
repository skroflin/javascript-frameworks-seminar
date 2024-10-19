import React from "react";
import { FaTimes, FaEdit } from 'react-icons/fa';

export const TodoCard = ({ todo, onDelete, onUpdate }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'No date specified'
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }
    return (
        <div className="todo-card">
            <div className="todo-card-header">
                <h3>{todo.title}</h3>
                <div>
                    <FaEdit onClick={() => onUpdate(todo)} className="icon edit-icon" />
                    <FaTimes onClick={() => onDelete(todo.id)} className="icon delete-icon" />
                </div>
            </div>
            <hr />
            <p>{todo.description}</p>
            <footer>
                <strong>Created:</strong><p>{formatDate(todo.date_created)}</p>
                <strong>Status:</strong> {todo.is_done ? <p className="todo-footer-completed">Completed</p> : <p className="todo-footer-not">Not completed</p>}
            </footer>
        </div>
    )
}
