import type { Task, Status } from "../../types/task";
import { TaskItem } from "../TaskItem";
import styles from "./styles.module.scss";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

type TaskColumnProps = {
  title: string;
  status: Status;
  tasks: Task[];
};

export const TaskColumn = ({ title, status, tasks }: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const taskIds = tasks.map((task) => task.id);

  return (
    <div ref={setNodeRef} className={styles.column}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <span className={styles.count}>{tasks.length}</span>
      </div>

      <SortableContext
        id={status}
        items={taskIds}
        strategy={verticalListSortingStrategy}
      >
        {tasks.length === 0 && <p className={styles.empty}>Нет задач</p>}
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};
