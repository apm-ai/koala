import React from 'react';
import { LocalStorageValueProvider } from '../LocalStorageValueProvider';
import { TimeRange, isDateTime, toUtc } from 'src/packages/datav-core';
import { Props as TimePickerProps, TimeRangePicker } from './TimeRangePicker';

const LOCAL_STORAGE_KEY = 'grafana.dashboard.timepicker.history';

interface Props extends Omit<TimePickerProps, 'history' | 'theme '> {}

export const TimePickerWithHistory: React.FC<Props> = props => {
  return (
    <LocalStorageValueProvider<TimeRange[]> storageKey={LOCAL_STORAGE_KEY} defaultValue={[]}>
      {(values, onSaveToStore) => {
        return (
          <TimeRangePicker
            {...props}
            // history={convertIfJson(values)}
            onChange={value => {
              props.onChange(value);
            }}
          />
        );
      }}
    </LocalStorageValueProvider>
  );
};

function convertIfJson(history: TimeRange[]): TimeRange[] {
  return history.map(time => {
    if (isDateTime(time.from)) {
      return time;
    }

    return {
      from: toUtc(time.from),
      to: toUtc(time.to),
      raw: time.raw,
    };
  });
}

