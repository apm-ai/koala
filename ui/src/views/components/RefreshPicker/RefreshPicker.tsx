import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { SelectableValue } from 'src/packages/datav-core';
import { css } from 'emotion';
import {Select,Tooltip,Button} from 'antd'

import {ReloadOutlined} from '@ant-design/icons';
import memoizeOne from 'memoize-one';

import './index.less'

export const defaultIntervals = ['5s', '10s', '30s', '1m', '5m', '15m', '30m', '1h', '2h', '1d'];
const getStyles = memoizeOne(() => {
  return {
    selectButton: css`
      label: selectButton;
      .select-button-value {
        color: #eb7b18;
      }
    `,
  };
});

export interface Props {
  intervals?: string[];
  onRefresh?: () => any;
  onIntervalChanged: (interval: string) => void;
  value?: string;
  tooltip?: string;
  hasLiveOption?: boolean;
  // You can supply your own refresh button element. In that case onRefresh and tooltip are ignored.
  refreshButton?: React.ReactNode;
  buttonSelectClassName?: string;
}

export class RefreshPickerBase extends PureComponent<Props> {
  static offOption = { label: 'Off', value: '' };
  static liveOption = { label: 'Live', value: 'LIVE' };
  static isLive = (refreshInterval?: string): boolean => refreshInterval === RefreshPicker.liveOption.value;

  constructor(props: Props) {
    super(props);
  }

  intervalsToOptions = (intervals: string[] | undefined) => {
    const intervalsOrDefault = intervals || defaultIntervals;
    const options = intervalsOrDefault.map(interval => ({ label: interval, value: interval }));

    if (this.props.hasLiveOption) {
      options.unshift(RefreshPicker.liveOption);
    }

    options.unshift(RefreshPicker.offOption);
    return options;
  };

  onChangeSelect = (item) => {
    const { onIntervalChanged } = this.props;
    if (onIntervalChanged) {
      // @ts-ignore
      onIntervalChanged(item.value);
    }
  };

  render() {
    const { onRefresh, intervals, tooltip, value, refreshButton, buttonSelectClassName } = this.props;
    const options = this.intervalsToOptions(intervals);
    const selectedValue = {label:'1m',value : '1m'}
    const styles = getStyles();

    const cssClasses = classNames({
      'refresh-picker': true,
      'refresh-picker--off': selectedValue.label === RefreshPicker.offOption.label,
      'refresh-picker--live': selectedValue === RefreshPicker.liveOption,
    });

    return (
      <div className={cssClasses}>
        <div className="refresh-picker-buttons">
          {refreshButton ? (
            refreshButton
          ) : (
            <Tooltip placement="top" title={tooltip!}>
              <Button
                onClick={onRefresh!}
              >
                <ReloadOutlined />
              </Button>
            </Tooltip>
          )}
          <Select
            className={classNames('navbar-button--attached', styles.selectButton, buttonSelectClassName)}
            value={selectedValue.value}
            options={options}
            onChange={this.onChangeSelect}
          />
        </div>
      </div>
    );
  }
}

export const RefreshPicker = RefreshPickerBase;
