/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-28 17:19:38
 * @LastEditors: liang
 * @LastEditTime: 2020-06-04 10:54:37
 */
import { Button, Form, Input } from 'antd';
import React from 'react';
import { message } from 'antd';
import { post } from '@/api/config';
import styled from 'styled-components';
const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f4;
`;
const LoginBox = styled.div`
  width: 8.412rem;
  height: auto;
  padding: 0.72rem 1.56rem;
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.12);
  background-color: #fff;
  text-align: center;
`;
const Title = styled.h2`
  font-size: 0.6rem;
  font-weight: bold;
`;
const LoginButton = styled(Button)`
  width: 2.4rem;
  height: 0.68rem;
  border: none;
  border-radius: 0.08rem;
`;
const FormItem = styled(Form.Item)`
  .ant-form-item-explain div {
    text-align: left;
  }
`;
function Login() {
  const { run, loading } = post('/auth/login', {
    manual: true,
    formatResult: (result) => {
      if (result?.code === 61001) {
        message.info(result.msg);
      }
      return result;
    }
  });
  const login = (values) => {
    const initParams = {
      userName: '',
      passWord: '',
      mobile: '',
      smsCode: ''
    };
    run(Object.assign(initParams, values));
  };
  return (
    <Section>
      <LoginBox>
        <Title>登录</Title>
        <Form onFinish={login}>
          <FormItem
            name="userName"
            rules={[
              {
                required: true,
                message: '请输入用户名!'
              }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem
            name="passWord"
            rules={[
              {
                required: true,
                message: '请输入密码!'
              }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <LoginButton htmlType="submit" type="primary">
              {loading ? '登录中...' : '登录'}
            </LoginButton>
          </FormItem>
        </Form>
      </LoginBox>
    </Section>
  );
}
export default Login;
