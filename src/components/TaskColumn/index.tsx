import type { Task, Status } from "../../types/task";
import { TaskItem } from "../TaskItem";
import styles from "./styles.module.scss";

type TaskColumnProps = {
  title: string;
  status: Status;
  tasks: Task[];
};

export const TaskColumn = ({ title, status, tasks }: TaskColumnProps) => {
  return (
    <div className={styles.column}>
      <h3>{title}</h3>
      {tasks.length === 0 && <p>No tasks here</p>}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
