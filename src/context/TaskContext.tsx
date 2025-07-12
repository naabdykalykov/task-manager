import { createContext, useContext, useState, type ReactNode } from "react";
import type { Task } from "../types/task";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Fix login bug",
    description: "Error on mobile login",
    category: "Bug",
    status: "To Do",
    priority: "High",
  },
  {
    id: "2",
    title: "Add filtering",
    category: "Feature",
    status: "In Progress",
    priority: "Medium",
  },
];

interface TaskContextType {
  tasks: Task[];
  updateTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
