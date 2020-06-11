import React from 'react'
import {SearchOutlined} from '@ant-design/icons';
  
const TraceSearch = React.lazy(() => import('src/views/TraceSearch'))
  
const Trace = [
    {
        path: '/ui/trace/search',
        title: 'traceSearch',
        icon: SearchOutlined,
        component: TraceSearch
    },
    // {
    //     path: '/ui/trace/detail/:id',
    //     title: 'traceDetail',
    //     icon: SearchOutlined,
    //     component: TracePage,
    //     inMenu: false
    // }
]
export default Trace