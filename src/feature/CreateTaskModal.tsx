import { Modal, Form, Input, Select, message } from "antd";
import type { Category, Status, Priority, Task } from "../types/task";

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

type Props = {
  open: boolean;
  onCreate: (values: Omit<Task, "id">) => void;
  onCancel: () => void;
};

type TaskFormValues = Omit<Task, "id">;

export const CreateTaskModal = ({ open, onCreate, onCancel }: Props) => {
  const [form] = Form.useForm<TaskFormValues>();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch(() => {
        message.error("Please fill in all required fields.");
      });
  };

  return (
    <Modal
      open={open}
      title="Create a New Task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="create_task_form"
        initialValues={{
          status: "To Do",
          priority: "Medium",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the task title!" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={4} placeholder="Enter task description (optional)" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            placeholder="Select a category"
            options={categories.map((c) => ({ label: c, value: c }))}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select
            placeholder="Select a status"
            options={statuses.map((s) => ({ label: s, value: s }))}
          />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select a priority!" }]}
        >
          <Select
            placeholder="Select a priority"
            options={priorities.map((p) => ({ label: p, value: p }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
