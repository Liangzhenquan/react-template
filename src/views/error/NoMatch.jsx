import { Button, Result } from 'antd';
import React from 'react';
export default function NoMatch({ history }) {
  const goBack = () => {
    history.goBack();
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，页面找不到."
      extra={
        <Button type="primary" onClick={goBack}>
          返回
        </Button>
      }
    />
  );
}
