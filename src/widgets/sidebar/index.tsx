import { Layout, Menu, Checkbox, Button, message } from "antd";
import {
  PieChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useTaskContext } from "../../context/TaskContext";
import type { Category, Priority, Status } from "../../types/task";
import styles from "./styles.module.scss";
import { CreateTaskModal } from "../../feature/CreateTaskModal";
import { useState } from "react";

const { Sider } = Layout;

const statusOptions: Status[] = ["To Do", "In Progress", "Done"];
const categoryOptions: Category[] = [
  "Bug",
  "Feature",
  "Documentation",
  "Refactor",
  "Test",
];
const priorityOptions: Priority[] = ["Low", "Medium", "High"];

const statusLabels: Record<Status, string> = {
  "To Do": "To Do",
  "In Progress": "In Progress",
  Done: "Done",
};
const categoryLabels: Record<Category, string> = {
  Bug: "Bug",
  Feature: "Feature",
  Documentation: "Documentation",
  Refactor: "Refactor",
  Test: "Test",
};
const priorityLabels: Record<Priority, string> = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
};

const Sidebar = () => {
  const {
    statusFilters,
    categoryFilters,
    priorityFilters,
    addTask,
    handleStatusFilterChange,
    handleCategoryFilterChange,
    handlePriorityFilterChange,
  } = useTaskContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCreate = (values: Omit<Task, "id">) => {
    addTask(values);
    message.success("Задача успешно создана!");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const statusCheckboxOptions = statusOptions.map((s) => ({
    label: statusLabels[s],
    value: s,
  }));
  const categoryCheckboxOptions = categoryOptions.map((c) => ({
    label: categoryLabels[c],
    value: c,
  }));
  const priorityCheckboxOptions = priorityOptions.map((p) => ({
    label: priorityLabels[p],
    value: p,
  }));

  return (
    <>
      <Sider width={"auto"} className={styles.sider}>
        <div className={styles.siderContent}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            items={[
              {
                key: "dashboard",
                icon: <PieChartOutlined />,
                label: "Dashboard",
              },
              {
                key: "allTasks",
                icon: <UnorderedListOutlined />,
                label: "All tasks",
              },
              { key: "myTasks", icon: <UserOutlined />, label: "My tasks" },
            ]}
          />
          <div className={styles.filtersContainer}>
            <div className={styles.filterGroup}>
              <h4>Status</h4>
              <Checkbox.Group
                options={statusCheckboxOptions}
                value={statusFilters}
                onChange={(values) =>
                  handleStatusFilterChange(values as Status[])
                }
              />
            </div>
            <div className={styles.filterGroup}>
              <h4>Categories</h4>
              <Checkbox.Group
                options={categoryCheckboxOptions}
                value={categoryFilters}
                onChange={(values) =>
                  handleCategoryFilterChange(values as Category[])
                }
                className={styles.categoryGroup}
              />
            </div>
            <div className={styles.filterGroup}>
              <h4>Priority</h4>
              <Checkbox.Group
                options={priorityCheckboxOptions}
                value={priorityFilters}
                onChange={(values) =>
                  handlePriorityFilterChange(values as Priority[])
                }
              />
            </div>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.createButton}
          block
          onClick={showModal}
        >
          Create new task
        </Button>
      </Sider>
      <CreateTaskModal
        open={isModalOpen}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Sidebar;
