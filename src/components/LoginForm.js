import React from 'react'
import {Form, Input, Button} from 'antd';

const LoginForm = () => {
 
    const onFinish=(e)=>{
        console.log(e);
    }

  return (
   
    <div>
     <Form onFinish={onFinish}>
        <Form.Item label="User Name" name="username">
            <Input placeholder="User Name" required></Input>
        </Form.Item>
        <Form.Item label="password" name="password">
            <Input placeholder="password" required></Input>
        </Form.Item>
        <Form.Item label="User Name" name="username">
            <Button type="primary" htmlType="submit">Login</Button>
        </Form.Item>
     </Form>
    </div>
  );
}

export default LoginForm