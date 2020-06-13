import _ from 'lodash'
import { Emitter } from 'src/core/library/utils/emitter';
import { PanelEvents, DataQuery, ScopedVars } from 'src/packages/datav-core'
import templateSrv from 'src/core/services/template'
import { getNextRefIdChar } from 'src/core/library/utils/query'

export interface GridPos {
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
}

const notPersistedProperties: { [str: string]: boolean } = {
    events: true,
    isViewing: true,
    isEditing: true,
    isInView: true,
    hasRefreshed: true,
    cachedPluginOptions: true,
    plugin: true,
    queryRunner: true,
    replaceVariables: true,
    editSourceId: true,
};

const defaults: any = {
    gridPos: { x: 0, y: 0, h: 3, w: 6 },
    targets: [{ refId: 'A' }],
    cachedPluginOptions: {},
    transparent: false,
    options: {},
    datasource: null,
};

export class PanelModel {
    id: number;
    gridPos: GridPos;
    type: string;
    title: string;
    datasource: string;
    collapsed?: boolean;
    targets: DataQuery[];
    scopedVars?: ScopedVars;
    // non persisted
    isViewing: boolean;
    isEditing: boolean;
    events: Emitter;
    hasRefreshed: boolean;
    isInView: boolean;

    constructor(model: any) {
        console.log(model)
        this.events = new Emitter();
        this.restoreModel(model);
        this.replaceVariables = this.replaceVariables.bind(this);
    }
    
    /** Given a persistened PanelModel restores property values */
    restoreModel(model: any) {
        // Start with clean-up
        for (const property in this) {
            if (notPersistedProperties[property] || !this.hasOwnProperty(property)) {
                continue;
            }

            if (model[property]) {
                continue;
            }

            if (typeof (this as any)[property] === 'function') {
                continue;
            }

            if (typeof (this as any)[property] === 'symbol') {
                continue;
            }

            delete (this as any)[property];
        }

        // copy properties from persisted model
        for (const property in model) {
            (this as any)[property] = model[property];
        }

        // defaults
        _.defaultsDeep(this, _.cloneDeep(defaults));

        // queries must have refId
        this.ensureQueryIds();
    }

    ensureQueryIds() {
        if (this.targets && _.isArray(this.targets)) {
            for (const query of this.targets) {
                if (!query.refId) {
                    query.refId = getNextRefIdChar(this.targets);
                }
            }
        }
    }

    replaceVariables(value: string, extraVars?: ScopedVars, format?: string) {
        let vars = this.scopedVars;
        if (extraVars) {
            vars = vars ? { ...vars, ...extraVars } : extraVars;
        }
        return templateSrv.replace(value, vars, format);
    }

    updateGridPos(newPos: GridPos) {
        let sizeChanged = false;

        if (this.gridPos.w !== newPos.w || this.gridPos.h !== newPos.h) {
            sizeChanged = true;
        }

        this.gridPos.x = newPos.x;
        this.gridPos.y = newPos.y;
        this.gridPos.w = newPos.w;
        this.gridPos.h = newPos.h;

        if (sizeChanged) {
            this.events.emit(PanelEvents.panelSizeChanged);
        }
    }

    resizeDone() {
        this.events.emit(PanelEvents.panelSizeChanged);
    }
} 