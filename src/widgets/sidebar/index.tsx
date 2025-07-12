import React, { useState } from "react";
import { Layout, Menu, Checkbox, Button } from "antd";
import {
  PieChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";

const { Sider } = Layout;

const statusOptions = ["To Do", "In Progress", "Done"];
const categoryOptions = ["Bug", "Feature", "Documentation", "Refactor", "Test"];
const priorityOptions = ["Low", "Medium", "High"];

const Sidebar = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([
    "Low",
    "High",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);

  const onStatusChange = (checkedValues: any) => {
    setSelectedStatus(checkedValues);
  };

  const onCategoryChange = (checkedValues: any) => {
    setSelectedCategory(checkedValues);
  };

  const onPriorityChange = (checkedValues: any) => {
    setSelectedPriority(checkedValues);
  };

  return (
    <Sider width={280} className={styles.sider}>
      <div className={styles.siderContent}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            { key: "dashboard", icon: <PieChartOutlined />, label: "Дашборд" },
            {
              key: "allTasks",
              icon: <UnorderedListOutlined />,
              label: "Все задачи",
            },
            { key: "myTasks", icon: <UserOutlined />, label: "Мои задачи" },
          ]}
        />
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <h4>Статус</h4>
            <Checkbox.Group options={statusOptions} onChange={onStatusChange} />
          </div>
          <div className={styles.filterGroup}>
            <h4>Категория</h4>
            <Checkbox.Group
              options={categoryOptions}
              onChange={onCategoryChange}
              className={styles.categoryGroup}
            />
          </div>
          <div className={styles.filterGroup}>
            <h4>Приоритет</h4>
            <Checkbox.Group
              options={priorityOptions}
              onChange={onPriorityChange}
              value={selectedStatus}
            />
          </div>
        </div>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className={styles.createButton}
        block
      >
        Создать задачу
      </Button>
    </Sider>
  );
};

export default Sidebar;
