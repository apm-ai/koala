import React from 'react'
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.less'

import { UserOutlined, LockOutlined } from '@ant-design/icons';

import storage from 'src/core/library/utils/localStorage'

import { isEmpty } from 'src/core/library/utils/validate'
import { setToken } from 'src/core/library/utils/auth';

import { store } from 'src/store/store';
import { updateUser } from 'src/store/reducers/user';
import {getBackendSrv} from 'src/packages/datav-core'

function Login() {
    const layout = {
        wrapperCol: { span: 20,offset:2 },
    };
    
    const history = useHistory()

    const onFinish = (values:any) => {
        getBackendSrv().post(
            '/api/login',
             {
                userid:values.userid,
                password: values.password
            }).then(res => {
                console.log(res)
            setToken(res.data.token)
            store.dispatch(updateUser(res.data.user))
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

    return (
        <div className="datav-login">
        <div className="datav-rectangle">
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="userid"
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="user id" />
            </Form.Item>

            <Form.Item
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




export default Login;