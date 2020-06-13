import React from 'react'

import { connect } from 'react-redux';

import { Layout } from 'antd'
import './index.less'
import BreadcrumbWrapper from '../Breadcrumb'

import {StoreState} from 'src/types'  
import {TimePickerWrapper} from 'src/views/components/TimePicker/TimePickerWrapper'

interface Props {
    startDate: any ,
    endDate :any 
}

const { Header } = Layout

function HeaderWrapper(props: Props) { 
    return (
        <Header className="datav-header">
            <div className='datav-header-inner'>
                <div>
                    <BreadcrumbWrapper />
                </div>
                <div>
                    <TimePickerWrapper />
                </div>
            </div>
        </Header>
    )
}

export const mapStateToProps = (state: StoreState) => ({
    startDate: state.application.startDate,
    endDate: state.application.endDate    
});

export default connect(mapStateToProps)(HeaderWrapper);