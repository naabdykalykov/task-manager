import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { Task, Status, Category, Priority } from "../types/task";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
    description: "Implement filtering in the sidebar",
    category: "Feature",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Write documentation for API",
    description: "Document all public API endpoints",
    category: "Documentation",
    status: "To Do",
    priority: "Low",
  },
  {
    id: "4",
    title: "Refactor CSS modules",
    description: "Convert all styles to use SCSS modules",
    category: "Refactor",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: "5",
    title: "Unit test the form component",
    category: "Test",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "6",
    title: "Deploy to production",
    category: "Feature",
    status: "Done",
    priority: "High",
  },
];

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  updateTask: (task: Task) => void;
  addTask: (task: Omit<Task, "id">) => void;
  statusFilters: Status[];
  categoryFilters: Category[];
  priorityFilters: Priority[];
  handleStatusFilterChange: (statuses: Status[]) => void;
  handleCategoryFilterChange: (categories: Category[]) => void;
  handlePriorityFilterChange: (priorities: Priority[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", mockTasks);

  const [statusFilters, setStatusFilters] = useState<Status[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<Category[]>([]);
  const [priorityFilters, setPriorityFilters] = useState<Priority[]>([]);

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  const addTask = (taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleStatusFilterChange = (statuses: Status[]) => {
    setStatusFilters(statuses);
  };
  const handleCategoryFilterChange = (categories: Category[]) => {
    setCategoryFilters(categories);
  };
  const handlePriorityFilterChange = (priorities: Priority[]) => {
    setPriorityFilters(priorities);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        statusFilters.length === 0 || statusFilters.includes(task.status);
      const categoryMatch =
        categoryFilters.length === 0 || categoryFilters.includes(task.category);
      const priorityMatch =
        priorityFilters.length === 0 || priorityFilters.includes(task.priority);
      return statusMatch && categoryMatch && priorityMatch;
    });
  }, [tasks, statusFilters, categoryFilters, priorityFilters]);

  const value = {
    tasks,
    filteredTasks,
    updateTask,
    addTask,
    statusFilters,
    categoryFilters,
    priorityFilters,
    handleStatusFilterChange,
    handleCategoryFilterChange,
    handlePriorityFilterChange,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
