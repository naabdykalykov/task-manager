import { useTaskContext } from "../../context/TaskContext";
import type { Status } from "../../types/task";
import { TaskColumn } from "../TaskColumn";
import styles from "./styles.module.scss";

const statusTitles: Record<Status, string> = {
  "To Do": "Open",
  "In Progress": "In progress",
  Done: "Done",
};

const TaskList = () => {
  const { tasks, filteredTasks } = useTaskContext();

  const tasksByStatus = {
    "To Do": filteredTasks.filter((t) => t.status === "To Do"),
    "In Progress": filteredTasks.filter((t) => t.status === "In Progress"),
    Done: filteredTasks.filter((t) => t.status === "Done"),
  };

  const noResultsAfterFilter = tasks.length > 0 && filteredTasks.length === 0;

  return (
    <>
      {noResultsAfterFilter ? (
        <div className={styles.noResults}>
          <p>Нет задач, соответствующих фильтрам</p>
          <span>Попробуйте изменить критерии поиска</span>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default TaskList;
