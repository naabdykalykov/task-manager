import React from "react";
import { Layout } from "antd";
import Sidebar from "./widgets/sidebar";

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
