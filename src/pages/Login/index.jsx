import React from 'react'
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.less'

import { inject, observer } from 'mobx-react'

// eslint-disable-next-line import/order, import/no-unresolved
import storage from '../../library/utils/localStorage'

import request from '../../library/utils/http' 
import { isEmpty } from '../../library/utils/validate'
import { setToken } from '../../library/utils/auth';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


function FormBox(props) {
    const {account:acc} = props
    const layout = {
        wrapperCol: { span: 20,offset:2 },
    };
    
    const history = useHistory()

    const onFinish = values => {
        request({
            url: '/web/login',
            method: 'POST',
            params: {
                username:values.username,
                password: values.password
            }
        }).then(res => {
            setToken(res.data.data.token)
            acc.setInfo(res.data.data.account)
            setTimeout(()=> {
                const oldPath = storage.get('lastPath')
                if (!isEmpty(oldPath)) {
                  storage.remove('lastPath')
                  history.push(oldPath)
                } else {
                    history.push('/ui/dashboard')
                }
            },200)
        })
       
    };

    const onFinishFailed = () => {
        // console.log('Failed:', errorInfo);
    };

    return (
        <div className="login">
        <div className="rectangle">
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                // label="Username"
                name="username"
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
                // label="Password"
                name="password"
            >
                <Input   prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>


            <Form.Item >
                <Button type="primary" htmlType="submit" block>
                    Log in
              </Button>
            </Form.Item>
        </Form>
        </div>
        </div>
    );
}


const Login = inject('account')(observer(FormBox))

export default Login