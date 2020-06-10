import React, { Suspense, useState, useEffect } from 'react'
import { Layout, BackTop } from 'antd'
import { Route } from 'react-router-dom'
import { isEmpty } from 'src/library/utils/validate'

const { Content } = Layout

function ContentWrapper(porps:any){
    const { routers } = porps
    const [routeItem, setRouteItem] = useState([])
    
    useEffect( () => {
        const item= []
        routers.map((route:any) => {
            if(!isEmpty(route.children)){
                route.children.map(r => {
                    item.push(r)
                    return ''
                })
            }else{
                item.push(route)
            }
            return ''
        })
        setRouteItem(item)
        return ()=>{
            setRouteItem([])
        }
    }, [routers])
    return(
        <>
            <Content  style={{ padding: '6px 20px' ,marginTop: 44 }}>
                <Suspense fallback={<div />}>
                    {
                        routeItem.map((route, i) => {
                            return(
                                <Route key={i.toString()} path={route.path} component={route.component}/>
                            )
                        })
                    }
                    {/* other url path redirect to home */}
                    {/* <Redirect to="/dashboard" /> */}
                </Suspense>
                <BackTop />
            </Content>
        </>
    )
}

export default ContentWrapper