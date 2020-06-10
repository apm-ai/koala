import React from 'react'
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.less'

import { UserOutlined, LockOutlined } from '@ant-design/icons';

import storage from 'src/library/utils/localStorage'

import request from 'src/library/utils/http' 
import { isEmpty } from 'src/library/utils/validate'
import { setToken } from 'src/library/utils/auth';

import { connect } from 'react-redux';
import {StoreState} from 'src/types'  
import { store } from 'src/store/store';
import { updateUser } from 'src/store/reducers/user';


function Login(props) {
    const {user} = props
    const layout = {
        wrapperCol: { span: 20,offset:2 },
    };
    
    const history = useHistory()

    const onFinish = values => {
        request({
            url: '/web/login',
            method: 'POST',
            params: {
                userid:values.userid,
                password: values.password
            }
        }).then(res => {
            setToken(res.data.data.token)
            store.dispatch(updateUser(res.data.data.user))
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
                name="userid"
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="user id" />
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


export const mapStateToProps = (state) => ({
    user: state.user    
});

export default connect(mapStateToProps)(Login);