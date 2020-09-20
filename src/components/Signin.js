import React, { useImperativeHandle, useState } from 'react'
import { Modal, Button, Form, Input, message, Row } from 'antd';

// Main
const Signin = (prop, ref) => {
  const [visible, setVisible] = useState(false)
  const [submitButton, setSubmitButton] = useState(false)


  useImperativeHandle(ref, () => {
    return {
      showModal: () => {
        setVisible(true)
      }
    }
  })

  const onFinish = (values) => {
    message.info(JSON.stringify(values))
  }

  const onFinishFailed = (errorInfo) => {
    message.error(`Failed: ${JSON.stringify(errorInfo)}`)
  }


  return (
    <Modal
      destroyOnClose={true}
      closable={() => setVisible(true)}
      title="Sign in"
      visible={visible}
      footer={false}
    >
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="username" label="username" rules={[{ required: true, message: 'Please input your username!', },]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="password" rules={[{ required: true, message: 'Please input your password!', },]}>
          <Input />
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

export default React.forwardRef(Signin)
