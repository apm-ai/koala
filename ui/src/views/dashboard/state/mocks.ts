import { DashboardModel } from './DashboardModel'
import {PanelModel} from './PanelModel'
export const dashboardMock = new DashboardModel(
    {
        id: 1,
        uid: "cBgEAwiMk",
        title: "New dashboard Copy",
        editable: true,
        panels: [
            new PanelModel( {
                id: 2,
                gridPos: { h: 8, w: 12, x: 0, y: 0 },
                type: "stat",
                title: "Panel Title",
                datasource: "Prometheus",
                hasRefreshed: true,
                isInView: true,
                isViewing: false,
                isEditing: false,
                collapsed:false,
            })
        ]
    }
)



