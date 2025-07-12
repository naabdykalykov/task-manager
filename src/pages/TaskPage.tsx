import { useParams } from "react-router-dom";
import { Typography } from "antd";

const { Title } = Typography;

const TaskPage = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "24px" }}>
      <Title>Редактирование задачи</Title>
      <p>ID задачи: {id}</p>
    </div>
  );
};

export default TaskPage;
