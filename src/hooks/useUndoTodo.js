import { useRef, useState } from "react";

export const useUndoTodo = (onRestore) => {
    const [undoTodo, setUndoTodo] = useState(null);
    const [showUndoToast, setShowUndoToast] = useState(false);
    const [undoProgress, setUndoProgress] = useState(100);

    const timerRef = useRef(null);

    const startUndo = (todo) => {
        setUndoTodo(todo);
        setShowUndoToast(true);
        setUndoProgress(100);

        let progress = 100;

        timerRef.current = setInterval(() => {
            progress -= 2;
            setUndoProgress(progress);

            if (progress <= 0) {
                clearInterval(timerRef.current);
                setShowUndoToast(false);
                setUndoTodo(null);
            }
        }, 100);
    };

    // Undo button click
    const handleUndo = () => {
        if (!undoTodo) return;

        onRestore(undoTodo);
        clearInterval(timerRef.current);

        setUndoTodo(null);
        setShowUndoToast(false);
        setUndoProgress(0);
    };

    return {
        showUndoToast,
        undoProgress,
        startUndo,
        handleUndo
    };
};


