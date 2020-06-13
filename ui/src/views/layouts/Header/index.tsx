import React from 'react'

import { connect } from 'react-redux';

import { Layout } from 'antd'
import './index.less'
import BreadcrumbWrapper from '../Breadcrumb'

import {StoreState} from 'src/types'  
import { store } from 'src/store/store';
import { updateStartDate,updateEndDate } from 'src/store/reducers/application';
import {TimeControl} from './TimeControl'
import {getTimeSrv} from 'src/core/services/time'

interface Props {
    startDate: any ,
    endDate :any 
}

const { Header } = Layout

function HeaderWrapper(props: Props) { 
    function changeDate(_: any, dateString: any) {
        store.dispatch(updateStartDate(dateString[0]))
        store.dispatch(updateEndDate(dateString[1]))
    }

    const timePickerValue = getTimeSrv().timeRange();
    return (
        <Header className="datav-header">
            <div className='datav-header-inner'>
                <div>
                    <BreadcrumbWrapper />
                </div>
                <div>
                    <TimeControl />
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