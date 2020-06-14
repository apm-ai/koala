import { PanelModel } from './PanelModel'
import { Emitter } from 'src/core/library/utils/emitter'
import { AppEvent } from 'src/packages/datav-core'
import {DashboardMeta} from 'src/types'

export class DashboardModel {
    id: any;
    uid: string;
    title: string;
    editable: boolean;
    panels: PanelModel[];
    events: Emitter;
    panelInEdit?: PanelModel;
    panelInView: PanelModel;
    meta: DashboardMeta;
    constructor(data: any) {
        if (!data) {
            data = {}
        }

        this.id = data.id || null;
        this.uid = data.uid || null;
        this.title = data.title || 'No Title';
        this.editable = data.editable !== false;
        this.panels = data.panels || []
        this.events = new Emitter();
        this.meta = {
            canEdit: true
        }
    }

    on<T>(event: AppEvent<T>, callback: (payload?: T) => void) {
        this.events.on(event, callback);
    }

    off<T>(event: AppEvent<T>, callback?: (payload?: T) => void) {
        this.events.off(event, callback);
    }

    sortPanelsByGridPos() {
        this.panels.sort((panelA, panelB) => {
            if (panelA.gridPos.y === panelB.gridPos.y) {
                return panelA.gridPos.x - panelB.gridPos.x;
            } else {
                return panelA.gridPos.y - panelB.gridPos.y;
            }
        });
    }

    otherPanelInFullscreen(panel: PanelModel) {
        return (this.panelInEdit || this.panelInView) && !(panel.isViewing || panel.isEditing);
    }

    setPanelFocus(id: number) {
        this.meta.focusPanelId = id;
    }
}

