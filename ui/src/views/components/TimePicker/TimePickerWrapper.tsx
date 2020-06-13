// Libaries
import React, { Component } from 'react';
import { dateMath,TimeRange,config} from 'src/packages/datav-core';
import { css } from 'emotion';

import {withRouter } from 'react-router-dom';

// import { LocationState } from 'app/types';
// State
// import { updateLocation } from 'app/core/actions';


import {stylesFactory} from 'src/core/library/utils/theme'
// Utils & Services
import {TimePickerWithHistory} from 'src/views/components/TimePicker/TimePickerWithHistory'
import {getTimeSrv} from 'src/core/services/time'

import { defaultIntervals ,RefreshPicker} from 'src/views/components/RefreshPicker/RefreshPicker';
// import { appEvents } from 'app/core/core';

const getStyles = stylesFactory(() => {
  return {
    container: css`
      position: relative;
      display: flex;
    `,
  };
});


class UnthemedDashNavTimeControls extends Component<any> {
  componentDidMount() {
    // Only reason for this is that sometimes time updates can happen via redux location changes
    // and this happens before timeSrv has had chance to update state (as it listens to angular route-updated)
    // This can be removed after timeSrv listens redux location
    // this.props.dashboard.on(CoreEvents.timeRangeUpdated, this.triggerForceUpdate);
  }

  componentWillUnmount() {
    // this.props.dashboard.off(CoreEvents.timeRangeUpdated, this.triggerForceUpdate);
  }

  triggerForceUpdate = () => {
    this.forceUpdate();
  };

  get refreshParamInUrl(): string {
    return '1m'
    // return this.props.location.query.refresh as string;
  }

  onChangeRefreshInterval = (interval: string) => {
    const {history,location} = this.props
    getTimeSrv().setAutoRefresh(interval,{history,location});
    this.forceUpdate();
  };

  onRefresh = () => {
    // getTimeSrv().refreshDashboard();
    console.log("time control on refresh, @todo something later")
    return Promise.resolve();
  };

  onMoveBack = () => {
    // appEvents.emit(CoreEvents.shiftTime, -1);
  };

  onMoveForward = () => {
    // appEvents.emit(CoreEvents.shiftTime, 1);
  };

  onChangeTimePicker = (timeRange: TimeRange) => {
    const {history,location} = this.props
    const adjustedFrom = dateMath.isMathString(timeRange.raw.from) ? timeRange.raw.from : timeRange.from;
    const adjustedTo = dateMath.isMathString(timeRange.raw.to) ? timeRange.raw.to : timeRange.to;
    const nextRange = {
      from: adjustedFrom,
      to:  adjustedTo,
    };

    getTimeSrv().setTime(nextRange,{history,location});

    this.forceUpdate();
  };

  onZoom = () => {
    // appEvents.emit(CoreEvents.zoomOut, 2);
  };

  render() {
    const intervals =  defaultIntervals

    const timePickerValue = getTimeSrv().timeRange();
    const timeZone = config.timePicker.timezone
    const styles = getStyles();
    const refresh = getTimeSrv().refresh
    return (
      <div className={styles.container}>
        <TimePickerWithHistory
          value={timePickerValue}
          onChange={this.onChangeTimePicker}
          timeZone={timeZone}
          onMoveBackward={this.onMoveBack}
          onMoveForward={this.onMoveForward}
          onZoom={this.onZoom}
        />
        <RefreshPicker
          onIntervalChanged={this.onChangeRefreshInterval}
          onRefresh={this.onRefresh}
          value={refresh}
          intervals={intervals}
          tooltip="Refresh dashboard"
        />
      </div>
    );
  }
}

export const TimePickerWrapper = withRouter(UnthemedDashNavTimeControls);
