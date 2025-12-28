import React from 'react'
import EmptyState from './EmptyState.jsx';
import TodoItems from './TodoItems.jsx';
import UndoToast from './UndoToast.jsx';
import EditModal from './EditModal.jsx';

const TodoList = ({ darkMode, filter, focusMode, visibleTodos, isOverdue, toggleTodo, onEditTodo, handleDeleteTodo, deleteTodo, showUndoToast, undoProgress, handleUndo, showEditModal, editTitle, setEditTitle, editPriority, setEditPriority, editDueDate, setEditDueDate, handleUpdateTodo, setShowEditModal }) => {
    return (
        <div className='space-y-3'>
            <EmptyState
                darkMode={darkMode}
                filter={filter}
                focusMode={focusMode}
                visibleTodos={visibleTodos}
            />
            <TodoItems
                darkMode={darkMode}
                visibleTodos={visibleTodos}
                isOverdue={isOverdue}
                toggleTodo={toggleTodo}
                onEditTodo={onEditTodo}
                deleteTodo={deleteTodo}
                handleDeleteTodo={handleDeleteTodo}
            />
            <UndoToast
                darkMode={darkMode}
                showUndoToast={showUndoToast}
                undoProgress={undoProgress}
                handleUndo={handleUndo}
            />

            <EditModal
                showEditModal={showEditModal}
                editTitle={editTitle}
                editPriority={editPriority}
                editDueDate={editDueDate}
                setEditTitle={setEditTitle}
                setEditPriority={setEditPriority}
                setEditDueDate={setEditDueDate}
                handleUpdateTodo={handleUpdateTodo}
                setShowEditModal={setShowEditModal}
                darkMode={darkMode}
            />
        </div>
    )
}

export default TodoList;