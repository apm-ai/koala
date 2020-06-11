import React from 'react';
import { DataSourcePluginOptionsEditorProps } from 'src/packages/datav-core';
import { PromSettings } from './PromSettings';
import { PromOptions } from '../types';

export type Props = DataSourcePluginOptionsEditorProps<PromOptions>;
export const ConfigEditor = (props: Props) => {
  const { options, onOptionsChange } = props;
  return (
    <>
      DataSourceHttpSettings 
      <PromSettings options={options} onOptionsChange={onOptionsChange} />
    </>
  );
};
