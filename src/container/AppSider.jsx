import { Avatar, Layout, Menu } from 'antd';
import React from 'react';
import { menus } from '@/router';
import styled from 'styled-components';
const { Sider } = Layout;
const Logo = styled.div`
  height: ${(props) => props.theme.headerHeight};
  line-height: ${(props) => props.theme.headerHeight};
  text-align: center;
  background: var(--au-color);
  .name {
    margin-left: 10px;
    color: #fff;
    cursor: pointer;
  }
`;

export default function AppSider() {
  const renderItem = (menu) => {
    return <Menu.Item key={menu.path}>{menu.title}</Menu.Item>;
  };
  const renderMenu = (menu) => {
    return (
      <Menu.SubMenu
        key={menu.title}
        title={
          <span>
            <span>{menu.title}</span>
          </span>
        }
      >
        {menu.sub.map((sub) => renderItem(sub))}
      </Menu.SubMenu>
    );
  };
  return (
    <Sider style={{ backgroundColor: '#fff' }}>
      <Logo>
        <Avatar shape="square" />
        <span className="name">admin</span>
      </Logo>
      <Menu mode="inline">
        {menus.map((menu) => (menu.sub ? renderMenu(menu) : renderItem(menu)))}
      </Menu>
    </Sider>
  );
}
