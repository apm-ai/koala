// Libraries
import _ from 'lodash';
// Utils
import kbn from '../library/utils/kbn';

// Types
import {
  dateMath,
  DefaultTimeRange,
  TimeRange,
  RawTimeRange,
  TimeZone,
  toUtc,
  dateTime,
  isDateTime,
} from 'src/packages/datav-core';
import { contextSrv } from './context';
import { getZoomedTimeRange, getShiftedTimeRange } from '../library/utils/timePicker';

import { config } from 'src/packages/datav-core';
import {timer} from './timer'
//@todo
// 替换成真实的url参数
const urlParams:any = {from: "now-1h", to: "now"}
export class TimeSrv {
  time: any;
  refreshTimer: any;
  refresh: any;
  oldRefresh: boolean;
  timeAtLoad: any;
  private autoRefreshBlocked: boolean;


  constructor() {
    // default time
    this.time = DefaultTimeRange.raw;


    document.addEventListener('visibilitychange', () => {
      if (this.autoRefreshBlocked && document.visibilityState === 'visible') {
        this.autoRefreshBlocked = false;
      }
    });
  }

  init() {
    timer.cancelAll();

    this.time = config.timePicker.time;
    this.refresh = config.timePicker.refresh;

    this.initTimeFromUrl();
    this.parseTime();

    // remember time at load so we can go back to it
    this.timeAtLoad = _.cloneDeep(this.time);

    if (this.refresh) {
      this.setAutoRefresh(this.refresh);
    }
  }

  getValidIntervals(intervals: string[]): string[] {
    if (!contextSrv.minRefreshInterval) {
      return intervals;
    }

    const validIntervals = intervals.filter(str => str !== '').filter(contextSrv.isAllowedInterval);

    if (validIntervals.indexOf(contextSrv.minRefreshInterval) === -1) {
      validIntervals.unshift(contextSrv.minRefreshInterval);
    }
    return validIntervals;
  }

  private parseTime() {
    // when absolute time is saved in json it is turned to a string
    if (_.isString(this.time.from) && this.time.from.indexOf('Z') >= 0) {
      this.time.from = dateTime(this.time.from).utc();
    }
    if (_.isString(this.time.to) && this.time.to.indexOf('Z') >= 0) {
      this.time.to = dateTime(this.time.to).utc();
    }
  }

  private parseUrlParam(value: any) {
    if (value.indexOf('now') !== -1) {
      return value;
    }
    if (value.length === 8) {
      const utcValue = toUtc(value, 'YYYYMMDD');
      if (utcValue.isValid()) {
        return utcValue;
      }
    } else if (value.length === 15) {
      const utcValue = toUtc(value, 'YYYYMMDDTHHmmss');
      if (utcValue.isValid()) {
        return utcValue;
      }
    }

    if (!isNaN(value)) {
      const epoch = parseInt(value, 10);
      return toUtc(epoch);
    }

    return null;
  }

  private getTimeWindow(time: string, timeWindow: string) {
    const valueTime = parseInt(time, 10);
    let timeWindowMs;

    if (timeWindow.match(/^\d+$/) && parseInt(timeWindow, 10)) {
      // when time window specified in ms
      timeWindowMs = parseInt(timeWindow, 10);
    } else {
      timeWindowMs = kbn.interval_to_ms(timeWindow);
    }

    return {
      from: toUtc(valueTime - timeWindowMs / 2),
      to: toUtc(valueTime + timeWindowMs / 2),
    };
  }

  private initTimeFromUrl() {
    const params = urlParams;
    if (params.time && params['time.window']) {
      this.time = this.getTimeWindow(params.time, params['time.window']);
    }

    if (params.from) {
      this.time.from = this.parseUrlParam(params.from) || this.time.from;
    }
    if (params.to) {
      this.time.to = this.parseUrlParam(params.to) || this.time.to;
    }
    // if absolute ignore refresh option saved to dashboard
    if (params.to && params.to.indexOf('now') === -1) {
      this.refresh = false;
      config.timePicker.refresh = false;
    }
    // but if refresh explicitly set then use that
    if (params.refresh) {
      if (contextSrv.isAllowedInterval(params.refresh)) {
        this.refresh = config.minRefreshInterval;
      } else {
        this.refresh = params.refresh || this.refresh;
      }
    }
  }



  setAutoRefresh(interval: any) {
    config.timePicker.refresh = interval;
    this.cancelNextRefresh();

    if (interval) {
      const validInterval = contextSrv.getValidInterval(interval);
      const intervalMs = kbn.interval_to_ms(validInterval);

      const t =  setTimeout(() => {
        this.startNextRefreshTimer(intervalMs);
      }, intervalMs)
      this.refreshTimer = timer.register(t);
    }

    // update url inside timeout to so that a digest happens after (called from react)
     setTimeout(() => {
      const params = urlParams;
      if (interval) {
        params.refresh = contextSrv.getValidInterval(interval);
        //@todo
        // 更新url params中的refresh
   
      } else if (params.refresh) {
        delete params.refresh;
          //@todo
        // 更新url params中的refresh
    
      }
    });
  }



  private startNextRefreshTimer(afterMs: number) {
    this.cancelNextRefresh();
    const t =  setTimeout(() => {
      this.startNextRefreshTimer(afterMs);
      if (contextSrv.isGrafanaVisible()) {

      } else {
        this.autoRefreshBlocked = true;
      }
    }, afterMs)
    this.refreshTimer = timer.register( t);
  }

  private cancelNextRefresh() {
    timer.cancel(this.refreshTimer);
  }

  setTime(time: RawTimeRange, fromRouteUpdate?: boolean) {
    _.extend(this.time, time);

    // disable refresh if zoom in or zoom out
    if (isDateTime(time.to)) {
      this.oldRefresh = config.timePicker.refresh || this.oldRefresh;
      this.setAutoRefresh(false);
    } else if (this.oldRefresh && this.oldRefresh !== config.timePicker.refresh) {
      this.setAutoRefresh(this.oldRefresh);
      this.oldRefresh = null;
    }

    // update url
    if (fromRouteUpdate !== true) {
      const urlRange = this.timeRangeForUrl();
      const params = urlParams;
      params.from = urlRange.from;
      params.to = urlRange.to;
      //@todo
      // 更新url

    }

    setTimeout(()=>{}, 0);
  }
  
  timeRangeForUrl = () => {
    const range = this.timeRange().raw;

    if (isDateTime(range.from)) {
      range.from = range.from.valueOf().toString();
    }
    if (isDateTime(range.to)) {
      range.to = range.to.valueOf().toString();
    }

    return range;
  };

  timeRange(): TimeRange {
    // make copies if they are moment  (do not want to return out internal moment, because they are mutable!)
    const raw = {
      from: isDateTime(this.time.from) ? dateTime(this.time.from) : this.time.from,
      to: isDateTime(this.time.to) ? dateTime(this.time.to) : this.time.to,
    };

    const timezone: TimeZone = config.timePicker.timezone
    return {
      from: dateMath.parse(raw.from, false, timezone),
      to: dateMath.parse(raw.to, true, timezone),
      raw: raw,
    };
  }

  zoomOut(factor: number) {
    const range = this.timeRange();
    const { from, to } = getZoomedTimeRange(range, factor);

    this.setTime({ from: toUtc(from), to: toUtc(to) });
  }

  shiftTime(direction: number) {
    const range = this.timeRange();
    const { from, to } = getShiftedTimeRange(direction, range);

    this.setTime({
      from: toUtc(from),
      to: toUtc(to),
    });
  }
}

let singleton: TimeSrv;

export function setTimeSrv(srv: TimeSrv) {
  singleton = srv;
}

export function getTimeSrv(): TimeSrv {
  return singleton;
}

