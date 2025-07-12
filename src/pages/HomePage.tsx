import { Typography } from "antd";
import TaskList from "../components/TaskList";

const { Title } = Typography;

export const HomePage = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title>Task Manager Dashboard</Title>
      <TaskList />
    </div>
  );
};
