import { useState } from "react";

export const useEditTodo = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editPriority, setEditPriority] = useState("medium");
    const [editDueDate, setEditDueDate] = useState("");

    const onEditTodo = (todo) => {
        setEditingTodo(todo);
        setEditTitle(todo.title);
        setEditPriority(todo.priority);
        setEditDueDate(todo.dueDate || "");
        setShowEditModal(true);
    }

    return {
        showEditModal, editingTodo, editTitle, editPriority, editDueDate, onEditTodo, setShowEditModal, setEditingTodo, setEditTitle, setEditPriority, setEditDueDate
    }
}
