import { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import type { Status, Task } from "../../types/task";
import { TaskColumn } from "../TaskColumn";
import { TaskItem } from "../TaskItem";
import styles from "./styles.module.scss";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";

const statusTitles: Record<Status, string> = {
  "To Do": "To Do",
  "In Progress": "In Progress",
  Done: "Done",
};

const TaskList = () => {
  const { tasks, filteredTasks, updateTask } = useTaskContext();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) {
      return;
    }
    if (active.id === over.id) {
      return;
    }

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) {
      return;
    }

    const newStatus = over.data.current?.sortable?.containerId || over.id;

    if (activeTask.status !== newStatus) {
      updateTask({ ...activeTask, status: newStatus as Status });
    }
  };

  const tasksByStatus = {
    "To Do": filteredTasks.filter((t) => t.status === "To Do"),
    "In Progress": filteredTasks.filter((t) => t.status === "In Progress"),
    Done: filteredTasks.filter((t) => t.status === "Done"),
  };

  const noResultsAfterFilter = tasks.length > 0 && filteredTasks.length === 0;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {noResultsAfterFilter ? (
        <div className={styles.noResults}>
          <p>No tasks matching the filters</p>
          <span>Try changing your search criteria</span>
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

      <DragOverlay>
        {activeTask ? <TaskItem task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskList;
