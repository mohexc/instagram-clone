import React, { useImperativeHandle, useState } from 'react'
import { Modal, Button, Form, Input, Row, message } from 'antd';
import { auth } from '../config/firebase';
import { useAuthContext } from '../context/AuthContext';

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

// Main
const SignUp = (props, ref) => {
  const [visible, setVisible] = useState(false)
  const [submitButton, setSubmitButton] = useState(false)
  const { reloadAuthContext } = useAuthContext()

  useImperativeHandle(ref, () => {
    return {
      showModal: () => {
        setVisible(true)
      }
    }
  })

  const onFinish = (values) => {
    setSubmitButton(true)
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .catch(err => message.error(`💥💥💥 ${err.message}`))
    reloadAuthContext()
    setVisible(false)
    setSubmitButton(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log(`Failed: ${JSON.stringify(errorInfo)}`)
  }


  return (
    <Modal
      destroyOnClose={true}
      closable={false}
      title="Sign Up"
      visible={visible}
      footer={false}
    >
      <Form   {...layout} name="SignUp" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="email" label="email" rules={[{ required: true, message: 'Please input your username!', }, { type: 'email', message: 'The input is not valid E-mail!', },]}>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="username" rules={[{ required: true, message: 'Please input your username!', },]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="password" rules={[{ required: true, message: 'Please input your password!', },]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Row justify="end">
            <Button style={{ marginRight: "1rem" }} htmlType="submit" type="primary" loading={submitButton} disabled={submitButton}>Submit</Button>
            <Button onClick={() => setVisible(false)}>Cancle</Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.forwardRef(SignUp)
