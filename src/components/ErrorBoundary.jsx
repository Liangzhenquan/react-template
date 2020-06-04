import React, { Component } from 'react';
import { Result } from 'antd';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
  render() {
    const { hasError } = this.state;
    const { children, fallBack } = this.props;
    if (hasError) {
      if (fallBack) {
        return null;
      }
      return <Result status="error" title="系统错误" />;
    }
    return children;
  }
}
export default ErrorBoundary;
