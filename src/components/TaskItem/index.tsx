import type { Task } from "../../types/task";
import { Card, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

type Props = {
  task: Task;
};

const categoryColors: Record<Task["category"], string> = {
  Bug: "#f5222d",
  Feature: "#1890ff",
  Documentation: "#52c41a",
  Refactor: "#fa8c16",
  Test: "#722ed1",
};

const statusColors: Record<Task["status"], string> = {
  "To Do": "#bfbfbf",
  "In Progress": "#1890ff",
  Done: "#52c41a",
};

const priorityColors: Record<Task["priority"], string> = {
  Low: "#73d13d",
  Medium: "#faad14",
  High: "#f5222d",
};

export const TaskItem = ({ task }: Props) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <Card
      className={styles.card} // подключаем твой стиль
      title={task.title}
      extra={
        <Button size="small" onClick={handleEdit}>
          Edit
        </Button>
      }
      style={{
        backgroundColor: "#1f1f23",
        border: "1px solid #2a2a2e",
        borderRadius: "10px",
        color: "#f0f0f0",
      }}
      headStyle={{
        backgroundColor: "#1f1f23",
        borderBottom: "1px solid #2a2a2e",
        color: "#fff",
        fontWeight: 600,
      }}
      bodyStyle={{
        color: "#d1d1d6",
        paddingTop: "8px",
      }}
    >
      {task.description && <p>{task.description}</p>}
      <div className={styles.tags}>
        <Tag color={categoryColors[task.category]}>{task.category}</Tag>
        <Tag color={statusColors[task.status]}>{task.status}</Tag>
        <Tag color={priorityColors[task.priority]}>{task.priority}</Tag>
      </div>
    </Card>
  );
};
