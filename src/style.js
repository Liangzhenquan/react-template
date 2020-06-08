/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-06-07 16:11:51
 * @LastEditors: liang
 * @LastEditTime: 2020-06-07 16:25:42
 */
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --theme-color: #41cabf; //主题色
  font-size: 50px;
  --au-color: #54d0dd; //辅助主题色
  --bg-color: #f5f5f6; //背景颜色
  // --link-color: #7546c9;
  // --success-color: #52c41a;
  // --warning-color: #faad14;
  // --error-color: #f5222d;
  // --font-size-base: 14px; // 主字号
  // --heading-color: rgba(0, 0, 0, 0.85); // 标题色
  // --text-color: rgba(0, 0, 0, 0.65); // 主文本色
  // --text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
  // --disabled-color: rgba(0, 0, 0, 0.25); // 失效色
  // --border-radius-base: 4px; // 组件/浮层圆角
  // --border-color-base: #d9d9d9; // 边框色
  // --box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
}
body {
  font-size: 14px;
}
.app {
  color: var(--theme-color);
}
.ant-layout.ant-layout-has-sider {
  height: 100vh;
  .logo {
    height: 50px;
    background: var(--au-color);
  }
  .layout-right {
    display: flex;
    flex: auto;
    flex-direction: column;
    overflow-y: hidden;
    .layout-header {
      background: var(--theme-color);
    }
    .ant-layout {
      overflow-x: hidden;
    }
    .contain,
    .ant-layout-footer {
      background: #f5f5f6;
    }
    .contain {
      height: 100%;
      padding: 0.2rem;
    }
    .layout-card {
      min-height: 100%;
      background: #fff;
    }
  }
  .layout-header {
    height: 60px;
    line-height: 60px;
  }
}
`;
const theme = {
  headerHeight: '60px'
};
export { GlobalStyle, theme };
