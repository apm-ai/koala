import React, { PureComponent } from 'react';
import classNames from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';

import {PanelModel} from './model/PanelModel'
import {DashboardModel} from './model/DashboardModel'
import { PanelPlugin } from 'src/packages/datav-core/src';
import {importPanelPlugin} from 'src/plugins/loader'

import { store } from 'src/store/store';

import { setPlugin } from 'src/store/reducers/plugins';
  
interface Props {
    panel: PanelModel
    dashboard: DashboardModel
    isEditing: boolean;
    isViewing: boolean;
    isInView: boolean;
}

interface State {
    isLazy: boolean
    plugin: PanelPlugin | null
}

export class PanelWrapper extends PureComponent<Props, State>{
    element: HTMLElement;
    specialPanels: { [key: string]: Function } = {};
  
    constructor(props: Props) {
      super(props);
  
      this.state = {
        isLazy: !props.isInView,
        plugin: null
      };
    }
  
    componentDidMount() {
      // load plugin to panel
      this.initPlugin(this.props.panel)
    }
  
    componentDidUpdate() {
      if (this.state.isLazy && this.props.isInView) {
        this.setState({ isLazy: false });
      }
    }
    
    async initPlugin(panel: PanelModel) {
        let plugin = store.getState().plugins.panels[panel.type]
        if (!plugin) {
          plugin = await this.loadPlugin(panel.type)
          console.log(plugin) 
          // store plugin
          store.dispatch(setPlugin(plugin))
        }
        this.setState({...this.state,plugin})
    }
    
    async loadPlugin(type:string) : Promise<PanelPlugin> {
      const plugin = importPanelPlugin(type)
      return plugin
    }

    onMouseEnter = () => {
      this.props.dashboard.setPanelFocus(this.props.panel.id);
    };
  
    onMouseLeave = () => {
      this.props.dashboard.setPanelFocus(0);
    };
  
    renderPanel(plugin: PanelPlugin) {
      const { dashboard, panel, isViewing, isInView, isEditing } = this.props;
  
      return (
        <AutoSizer>
          {({ width, height }) => {
            if (width === 0) {
              return null;
            }
  
            return (
              <></>
              // <PanelChrome
              //   plugin={plugin}
              //   panel={panel}
              //   dashboard={dashboard}
              //   isViewing={isViewing}
              //   isEditing={isEditing}
              //   isInView={isInView}
              //   width={width}
              //   height={height}
              //   updateLocation={updateLocation}
              // />
            );
          }}
        </AutoSizer>
      );
    }
  
    render() {
      const { isViewing } = this.props;
      const { isLazy,plugin } = this.state;
  
      // if we have not loaded plugin exports yet, wait
      if (!plugin) {
        return null;
      }
  
      // If we are lazy state don't render anything
      if (isLazy) {
        return null;
      }
  
      const panelWrapperClass = classNames({
        'panel-wrapper': true,
        'panel-wrapper--view': isViewing,
      });
  
      return (
        <div className={panelWrapperClass} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          {this.renderPanel(plugin)}
        </div>
      );
    }
}