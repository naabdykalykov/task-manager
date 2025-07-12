import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Typography, message } from "antd";
import { useTaskContext } from "../context/TaskContext";
import type { Category, Priority, Status, Task } from "../types/task";

const { Title } = Typography;
const { TextArea } = Input;
const categories: Category[] = [
  "Bug",
  "Feature",
  "Documentation",
  "Refactor",
  "Test",
];
const statuses: Status[] = ["To Do", "In Progress", "Done"];
const priorities: Priority[] = ["Low", "Medium", "High"];

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTaskContext();
  const [form] = Form.useForm();

  const task = tasks.find((t) => t.id === id);

  useEffect(() => {
    if (task) {
      form.setFieldsValue(task);
    } else {
      message.error("Задача не найдена");
      navigate("/");
    }
  }, [task, form, navigate]);

  const onFinish = (values: Task) => {
    updateTask(values);
    message.success("Задача сохранена");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 12px" }}>
      <Title level={2}>Редактирование задачи</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[{ required: true, message: "Пожалуйста, введите заголовок" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Описание" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Категория"
          name="category"
          rules={[
            { required: true, message: "Пожалуйста, выберите категорию" },
          ]}
        >
          <Select options={categories.map((c) => ({ label: c, value: c }))} />
        </Form.Item>

        <Form.Item
          label="Статус"
          name="status"
          rules={[{ required: true, message: "Пожалуйста, выберите статус" }]}
        >
          <Select options={statuses.map((s) => ({ label: s, value: s }))} />
        </Form.Item>

        <Form.Item
          label="Приоритет"
          name="priority"
          rules={[
            { required: true, message: "Пожалуйста, выберите приоритет" },
          ]}
        >
          <Select options={priorities.map((p) => ({ label: p, value: p }))} />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => navigate("/")}>Отмена</Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default TaskPage;
