import React from 'react'
import {
    HomeOutlined,
    SettingFilled,
    DingtalkOutlined
  } from '@ant-design/icons';

import Trace from './modules/trace'


const Test = React.lazy(() => import('../views/Test'))
const Dashboard = React.lazy(() => import('../views/dashboard/DashboardPage'))

const Routers = [
    {
        path: '/ui/dashboard',
        title: 'dashboard',
        icon: HomeOutlined,
        component: Dashboard
    },
    { 
        path: '/ui/test1',
        title: 'chart',
        icon: SettingFilled,
        component: Test
    },
    {
        path: '/ui/trace',
        title: 'trace',
        icon: DingtalkOutlined,
        children: Trace
    }
]

export default Routers