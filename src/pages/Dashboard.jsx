import React from 'react'
import { useTheme } from '../hooks/useTheme.js'
import Header from '../components/Header.jsx';
import { useTodos } from '../hooks/useTodos.js';
import AddTodoForm from '../components/AddTodoForm.jsx';
import FilterBar from '../components/FilterBar.jsx';
import { useFilteredTodos } from '../hooks/useFilteredTodos.js';
import TodoList from '../components/TodoList.jsx';
import { useEditTodo } from '../hooks/useEditTodo.js';
import { useUndoTodo } from '../hooks/useUndoTodo.js';

const Dashboard = () => {
    const { darkMode, toggleTheme } = useTheme();
    const { todos, addTodo, toggleTodo, deleteTodo, restoreTodo, updateTodo } = useTodos();
    const { filter, setFilter, focusMode, setFocusMode, visibleTodos, isOverdue } = useFilteredTodos(todos)
    const { showEditModal, editingTodo, editTitle, editPriority, editDueDate, onEditTodo, setShowEditModal, setEditingTodo, setEditTitle, setEditPriority, setEditDueDate } = useEditTodo()
    const { showUndoToast, undoProgress, startUndo, handleUndo } = useUndoTodo(restoreTodo);

    const handleDeleteTodo = (todo) => {
        deleteTodo(todo.id);
        startUndo(todo);
    };

    const handleUpdateTodo = () => {
        if (!editTitle.trim()) return;

        updateTodo({
            id: editingTodo.id,
            title: editTitle.trim(),
            priority: editPriority,
            dueDate: editDueDate || null
        });

        setShowEditModal(false);
        setEditingTodo(null);
    };


    return (
        <>
            <div
                className='min-h-screen p-4 transition-all duration-300'
                style={{
                    background: darkMode
                        ? "linear-gradient(to bottom right, #1e293b, #0f172a)"
                        : "linear-gradient(to bottom right, #f8fafc, #c7d2fe)"
                }}

            >
                <div className='max-w-4xl mx-auto space-y-3'>
                    <Header todos={todos} darkMode={darkMode} toggleTheme={toggleTheme} />
                    <AddTodoForm darkMode={darkMode} onAddTodo={addTodo} />
                    <FilterBar
                        darkMode={darkMode}
                        filter={filter}
                        setFilter={setFilter}
                        focusMode={focusMode}
                        setFocusMode={setFocusMode}
                    />
                    <TodoList
                        darkMode={darkMode}
                        filter={filter}
                        focusMode={focusMode}
                        visibleTodos={visibleTodos}
                        isOverdue={isOverdue}
                        toggleTodo={toggleTodo}
                        onEditTodo={onEditTodo}
                        handleDeleteTodo={handleDeleteTodo}
                        showUndoToast={showUndoToast}
                        undoProgress={undoProgress}
                        handleUndo={handleUndo}
                        showEditModal={showEditModal}
                        editTitle={editTitle}
                        editPriority={editPriority}
                        editDueDate={editDueDate}
                        setEditTitle={setEditTitle}
                        setEditPriority={setEditPriority}
                        setEditDueDate={setEditDueDate}
                        handleUpdateTodo={handleUpdateTodo}
                        setShowEditModal={setShowEditModal}
                    />
                </div>
            </div>
        </>
    )
}

export default Dashboard