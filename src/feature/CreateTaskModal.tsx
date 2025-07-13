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
        message.error("Пожалуйста, заполните все обязательные поля.");
      });
  };

  return (
    <Modal
      open={open}
      title="Создать новую задачу"
      okText="Создать"
      cancelText="Отмена"
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
          label="Заголовок"
          rules={[
            { required: true, message: "Пожалуйста, введите заголовок!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Категория"
          rules={[
            { required: true, message: "Пожалуйста, выберите категорию!" },
          ]}
        >
          <Select options={categories.map((c) => ({ label: c, value: c }))} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Статус"
          rules={[{ required: true, message: "Пожалуйста, выберите статус!" }]}
        >
          <Select options={statuses.map((s) => ({ label: s, value: s }))} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Приоритет"
          rules={[
            { required: true, message: "Пожалуйста, выберите приоритет!" },
          ]}
        >
          <Select options={priorities.map((p) => ({ label: p, value: p }))} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
