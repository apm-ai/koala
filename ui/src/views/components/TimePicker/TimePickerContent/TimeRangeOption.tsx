import React, { memo } from 'react';
import { css } from 'emotion';
import { TimeOption } from 'src/packages/datav-core';
import {  stylesFactory } from 'src/core/library/utils/theme';
import { CheckOutlined} from '@ant-design/icons';
const getStyles = stylesFactory(() => {
  return {
    container: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 7px;
      border-left: 2px solid rgba(255, 255, 255, 0);

      &:hover {
        background: #1f1f20;
        border-image: linear-gradient(#f05a28 30%, #fbca0a 99%);
        border-image-slice: 1;
        border-style: solid;
        border-top: 0;
        border-right: 0;
        border-bottom: 0;
        border-left-width: 2px;
        cursor: pointer;
      }
    `,
  };
});

interface Props {
  value: TimeOption;
  selected?: boolean;
  onSelect: (option: TimeOption) => void;
}

export const TimeRangeOption = memo<Props>(({ value, onSelect, selected = false }) => {
  const styles = getStyles();

  return (
    <div className={styles.container} onClick={() => onSelect(value)} tabIndex={-1}>
      <span>{value.display}</span>
      {selected ? <CheckOutlined  /> : null}
    </div>
  );
});
