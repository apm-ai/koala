import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import { connect } from 'react-redux';

import './index.less'
import { FormattedMessage as Message } from 'react-intl'
import { GlobalOutlined, UserOutlined,createFromIconfontCN} from '@ant-design/icons';
import { isEmpty } from 'src/library/utils/validate'
import { logout } from 'src/library/utils/account';


import { store } from 'src/store/store';

import { updateLocale,updateTheme } from 'src/store/reducers/application';
 
const { Sider } = Layout

const { SubMenu } = Menu
const SiderWrapper =  props => {
    const { theme,routers } = props
    
    const location = useLocation()
    const MyIcon = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_1402269_m6v7u5uwb2.js',
    });
    return (
        <Sider collapsed={true} className="datav-sider">
            <div>
                <div className="datav-logo" />
                <Menu
                    mode='vertical'
                    selectedKeys={[location.pathname]}
                    forceSubMenuRender={true}
                    theme="dark"
                >
                    {
                        routers.map(route => {
                            if (isEmpty(route.children)) {
                                return (
                                    <Menu.Item key={`${route.path}`}>
                                        <Link to={route.path}>

                                            <route.icon />
                                            <span><Message id={route.title} /></span>
                                        </Link>
                                    </Menu.Item>
                                )
                            }
                            const items = []
                            route.children.map(r => {
                                if (r.inMenu !== false) {
                                    items.push(
                                        <Menu.Item key={r.path}>
                                            <Link to={r.path}>
                                                {
                                                    // isEmpty(r.icon) ? '' : <r.icon />
                                                }
                                                <span><Message id={r.title} /></span>
                                            </Link>
                                        </Menu.Item>
                                    )
                                }
                                return ''
                            })
                            return (
                                <SubMenu key={`${route.path}`} title={
                                    <span>
                                        <route.icon />
                                        <span><Message id={route.title} /></span>
                                    </span>
                                }>
                                    {items}
                                </SubMenu>
                            )
                        })
                    }

                    <Menu.Item key="set-locale1" style={{ position: 'absolute', bottom: '95px', right: '35px' }}>
                        {
                            theme === 'light' ?
                                <MyIcon type="icon-moon" onClick={() => {
                                    store.dispatch(updateTheme('dark')) 
                                }} /> :
                                <MyIcon type="icon-sun" onClick={() => {
                                    store.dispatch(updateTheme('light')) 
                                }} style={{ fontSize: '18px' }} />
                        }

                        <span><Message id='changeTheme' /></span>
                    </Menu.Item>
                    <Menu.Item key="set-locale" style={{ position: 'absolute', bottom: '55px', right: '35px', fontSize: '16px' }}>
                        <GlobalOutlined onClick={() => { 
                            store.dispatch(updateLocale()) 
                            }} />
                        <span><Message id='languages' /></span>
                    </Menu.Item>
                    <SubMenu key="user-setting" icon={<UserOutlined />} style={{ position: 'absolute', bottom: '20px', right: '-6px', fontSize: '16px' }}>
                        <Menu.Item key="logout" onClick={logout}>Logout</Menu.Item>
                    </SubMenu>
                </Menu>

            </div>
        </Sider>
    )
}

export const mapStateToProps = (state) => ({
    theme: state.application.theme    
});

export default connect(mapStateToProps)(SiderWrapper);
