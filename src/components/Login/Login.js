import React from 'react'

import { Button, Checkbox, Form, Grid, Input, theme, Typography } from 'antd'

import { LockOutlined, MailOutlined } from '@ant-design/icons'

const { useToken } = theme
const { useBreakpoint } = Grid
const { Text, Title, Link } = Typography

function Login() {
  const { token } = useToken()
  const screens = useBreakpoint()

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  const styles = {
    container: {
      margin: '0 auto',
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: '380px',
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: 'center',
      width: '100%',
    },
    forgotPassword: {
      float: 'right',
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: 'center',
      backgroundColor: token.colorBgContainer,
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
      padding: screens.md ? `${token.sizeXXL}px 0px` : '0px',
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </svg>

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>Welcome to _ NNT EXPRESS! sign in.</Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          {/*<Form.Item>*/}
          {/*    /!*<Form.Item name="remember" valuePropName="checked" noStyle>*!/*/}
          {/*    /!*    <Checkbox style={{marginRight:'400px', width: '300px'}}>Remember me</Checkbox>*!/*/}
          {/*    /!*</Form.Item>*!/*/}
          {/*    /!*<a style={styles.forgotPassword} href="">*!/*/}
          {/*    /!*    Forgot password?*!/*/}
          {/*    /!*</a>*!/*/}
          {/*</Form.Item>*/}
          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block="true" type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
export default Login
