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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTaskContext();
  const [form] = Form.useForm();

  const task = tasks.find((t) => t.id === id);

  useEffect(() => {
    if (task) {
      form.setFieldsValue(task);
    } else {
      message.error("Task not found");
      navigate("/");
    }
  }, [task, form, navigate]);

  const onFinish = (values: Omit<Task, "id">) => {
    if (id) {
      const updatedTask = { ...values, id };
      updateTask(updatedTask);

      message.success("Task updated successfully");
      navigate("/");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 12px" }}>
      <Title level={2}>Edit Task</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the task title" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="Enter task description (optional)" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Select a category"
            options={categories.map((c) => ({ label: c, value: c }))}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select
            placeholder="Select a status"
            options={statuses.map((s) => ({ label: s, value: s }))}
          />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Please select a priority" }]}
        >
          <Select
            placeholder="Select a priority"
            options={priorities.map((p) => ({ label: p, value: p }))}
          />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => navigate("/")}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskPage;
