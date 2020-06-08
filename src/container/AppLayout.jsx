import AppSider from './AppSider';
import { Layout } from 'antd';
import React from 'react';
import { RouteWithSubRoutes } from '@/router';
import styled from 'styled-components';
const { Content } = Layout;
const Header = styled.div`
  height: ${(props) => props.theme.headerHeight};
  line-height: ${(props) => props.theme.headerHeight};
  background: var(--theme-color);
`;
export default function AppLayout({ routes }) {
  return (
    <Layout>
      <AppSider />
      <div className="layout-right">
        <Header>头部</Header>
        <Layout>
          <Content className="layout-content">
            <div className="contain">
              <div className="layout-card">
                <RouteWithSubRoutes routes={routes} />
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
}
