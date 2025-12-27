import { useMemo, useState } from "react";

export const useFilteredTodos = (todos) => {

    const [filter, setFilter] = useState("all");
    const [focusMode, setFocusMode] = useState(false);

    const isOverdue = (dueDate) => {
        if (!dueDate) return false;

        const today = new Date().setHours(0, 0, 0, 0);
        return new Date(dueDate) < today;
    };

    const smartSortedTodos = (list) => {
        return [...list].sort((a, b) => {

            // Overdue first
            const aOver = isOverdue(a.dueDate);
            const bOver = isOverdue(b.dueDate);

            if (aOver && !bOver) return -1;
            if (!aOver && bOver) return 1;

            // Priority order
            const priorityRank = { high: 0, medium: 1, low: 2 };
            if (priorityRank[a.priority] !== priorityRank[b.priority]) {
                return priorityRank[a.priority] - priorityRank[b.priority];
            }

            // Newest first
            return b.createdAt - a.createdAt;
        });
    };

    const visibleTodos = useMemo(() => {
        let list = todos;

        if (filter === "active") {
            list = list.filter(t => !t.completed);
        }

        if (filter === "completed") {
            list = list.filter(t => t.completed);
        }

        if (focusMode) {
            list = list.filter(
                t => !t.completed && t.priority === "high"
            );
        }

        return smartSortedTodos(list);
    }, [todos, filter, focusMode]);

    return {
        filter, setFilter, focusMode, setFocusMode, visibleTodos
    }
}
