import React, { useEffect, useState } from "react";
//Design system sources
import { Layout, Menu, Breadcrumb, Card, Row, Col, Pagination } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Meta } = Card;

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadPosts(1);
  }, []);

  function loadWarn() {
    toast.warn("Data Updating...", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
  function loadPosts(page) {
    fetch(`https://api.bourseon.com/posts?take=9&page=${page}`)
      .then((stream) => stream.json())
      .then((res) => {
        setData(res);
      });
  }
  function handlePagination(e) {
    loadPosts(e);
  }
  return (
    <>
      <div>
        <Layout>
          <Header className="header" style={{ backgroundColor: "#5C7AEA" }}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ backgroundColor: "#5C7AEA" }}
            >
              <Menu.Item key="1" style={{ color: "black", fontSize: "16px" }}>
                News of Bourseon
              </Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="Sections">
                  <Menu.Item key="1">Technology</Menu.Item>
                  <Menu.Item key="2">Crypto Currency</Menu.Item>
                  <Menu.Item key="3">Country</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>News</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <div>
                  <Row gutter={[8, 8]}>
                    {data ? (
                      <>
                        {data.posts.map((data) => (
                          <Col xs={24} md={8} sm={6}>
                            <Card
                              hoverable
                              cover={
                                <img
                                  alt={data.id}
                                  style={{ maxWidth: "100%" }}
                                  src={`https://cdn.bourseon.com/${data.cover}`}
                                />
                              }
                            >
                              <Meta
                                title={data.title}
                                description={data.type}
                              />
                            </Card>
                          </Col>
                        ))}
                        <Col span={24}>
                          <div
                            style={{ textAlign: "center", paddingTop: "40px" }}
                          >
                            <Pagination
                              current={data.pagination.page}
                              total={data.pagination.totalCount}
                              pageSize={9}
                              onChange={handlePagination}
                            />
                          </div>
                        </Col>
                      </>
                    ) : (
                      // <h2>در حال آپدیت...</h2>
                      loadWarn()
                    )}
                  </Row>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
