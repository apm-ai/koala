import React from 'react';
import { DashboardModel } from './state/DashboardModel'
import { CustomScrollbar } from 'src/views/components/CustomScrollbar'
import {dashboardMock} from './state/mocks'
import {DashboardGrid} from './DashGrid'
interface Props {
}

interface State {
    scrollTop: number;
    updateScrollTop?: number;
    rememberScrollTop: number;
    dashboard: DashboardModel | null;
}

export default class DashboardPage extends React.PureComponent<Props, State> {
    state: State = {
        scrollTop: 0,
        rememberScrollTop: 0,
        dashboard: null
    };

    async componentDidMount() {
       const ds = new DashboardModel(dashboardMock)
       this.setState({...this.state, dashboard:ds})
    }

    setScrollTop = (e: React.MouseEvent<HTMLElement>): void => {
        const target = e.target as HTMLElement;
        this.setState({ scrollTop: target.scrollTop, updateScrollTop: null });
    };

    render() {
        const { dashboard,updateScrollTop,scrollTop } = this.state
        if (!dashboard) {
            return null
        }
        const approximateScrollTop = Math.round(scrollTop / 25) * 25;
        return (
            <div>
                <div className="scroll-canvas scroll-canvas--dashboard">
                    <CustomScrollbar
                        autoHeightMin="100%"
                        setScrollTop={this.setScrollTop}
                        scrollTop={updateScrollTop}
                        updateAfterMountMs={500}
                        className="custom-scrollbar--page"
                    >
                        <div className="dashboard-container">
                        <DashboardGrid
                            dashboard={dashboard}
                            viewPanel={null}
                            scrollTop={approximateScrollTop}
                        />
                        </div>
                    </CustomScrollbar>
                </div>
            </div>
        )
    }
}