import React from 'react'

import { connect } from 'react-redux';

import { Layout, DatePicker } from 'antd'
import './index.less'
import moment from 'moment';
import BreadcrumbWrapper from '../Breadcrumb'

import {StoreState} from 'src/types'  
import { store } from 'src/store/store';
import { updateStartDate,updateEndDate } from 'src/store/reducers/application';

interface Props {
    startDate: any ,
    endDate :any
}

const { Header } = Layout

function HeaderWrapper(props: Props) {
    const { RangePicker } = DatePicker;
    function changeDate(_: any, dateString: any) {
        store.dispatch(updateStartDate(dateString[0]))
        store.dispatch(updateEndDate(dateString[1]))
    }

    return (
        <Header className="datav-header">
            <div className='datav-header-inner'>
                <div>
                    <BreadcrumbWrapper />
                </div>
                <div>
                    <div>
                    <RangePicker
                        className="date-picker"
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={changeDate}
                        value={[moment(props.startDate), moment(props.endDate)]}
                        ranges={{
                            '5m': [moment().subtract(5, 'm'), moment()],
                            '30m': [moment().subtract(30, 'm'), moment()],
                            '1h': [moment().subtract(1, 'h'), moment()],
                            '6h': [moment().subtract(6, 'h'), moment()],
                            '1d': [moment().subtract(1, 'd'), moment()],
                            '3d': [moment().subtract(3, 'd'), moment()],
                            '7d': [moment().subtract(7, 'd'), moment()],
                        }}
                    />
                    </div>
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