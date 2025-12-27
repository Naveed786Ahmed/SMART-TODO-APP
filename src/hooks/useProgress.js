import { useTodos } from "./useTodos"

export const useProgress = (todos) => {

    const completedCount = todos.filter(t => t.completed).length;
    const progress = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

    return{
        completedCount, progress
    }
}