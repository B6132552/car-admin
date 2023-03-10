import { Col, Layout, Menu, Row, theme } from "antd";
import React, { useState } from "react";
import CSS from "csstype";
import navMenu from "../nav";
import { NavLink, Outlet, useLocation } from "react-router-dom";
type Props = {
  children?: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = () => {
  const { Content, Sider } = Layout;
  const [hover, setHover] = useState<boolean>(false);
  const location = useLocation();

  const GetCurrentMenu = () => {
    const currentNav = navMenu?.find(
      (item: any) =>
        item?.link.split("/")[1] === location?.pathname.split("/")[1]
    )?.keyName;

    return currentNav || "USERMANAGEMENT";
  };
  const toggleHover = () => {
    setHover(!hover);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const hoverLayout: CSS.Properties = {
    padding: "18px",
  };

  const text: CSS.Properties = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "22px",
    color: "#114942",
    marginBottom: "50px",
  };

  return (
    <Layout className="layout" style={{ backgroundColor: "#f1f3ec" }}>
      <Sider
        style={hoverLayout}
        trigger={null}
        collapsible
        collapsed={false}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <div className="logo" />
        <p style={text}>TEST</p>
        <Menu
          theme="dark"
          mode="inline"
          className="menu-ant-custom"
          triggerSubMenuAction="click"
          defaultSelectedKeys={["0"]}
        >
          <Menu
            defaultSelectedKeys={[GetCurrentMenu()]}
            // selectedKeys={[GetCurrentMenu()]}
            theme="dark"
            mode="inline"
            className="p-1 pr-2 pl-2"
          >
            {navMenu.map((item: any, idx: number) => (
              <Menu.Item
                id={item.keyName + `${idx}`}
                key={item?.keyName}
                className="menu-item-side-child"
              >
                <NavLink
                  key={item.keyName}
                  to={item.link}
                  id={item.keyName + `${idx}`}
                >
                  <Row justify="end" align="middle">
                    <Col span={24}>
                      <div className="pt-1 pb-1">{item.name}</div>
                    </Col>
                  </Row>
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            marginTop: "24px",
            marginBottom: "24px",
            marginRight: "24px",
          }}
        >
          <div
            style={{
              borderRadius: 24,
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
