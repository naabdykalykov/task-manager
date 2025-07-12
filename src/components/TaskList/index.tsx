import { useTaskContext } from "../../context/TaskContext";
import type { Status } from "../../types/task";
import { TaskColumn } from "../TaskColumn";
import styles from "./styles.module.scss";

const statusTitles: Record<Status, string> = {
  "To Do": "Открытые",
  "In Progress": "В работе",
  Done: "Готово",
};

const TaskList = () => {
  const { tasks } = useTaskContext();

  const tasksByStatus = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Done: tasks.filter((t) => t.status === "Done"),
  };

  return (
    <div className={styles.container}>
      {(["To Do", "In Progress", "Done"] as Status[]).map((status) => (
        <TaskColumn
          key={status}
          status={status}
          title={statusTitles[status]}
          tasks={tasksByStatus[status]}
        />
      ))}
    </div>
  );
};

export default TaskList;
