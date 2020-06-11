import React, { SyntheticEvent } from 'react';
import {
  DataSourcePluginOptionsEditorProps,
} from 'src/packages/datav-core';
import { PromOptions } from '../types';


type Props = Pick<DataSourcePluginOptionsEditorProps<PromOptions>, 'options' | 'onOptionsChange'>;

export const PromSettings = (props: Props) => {
  // const { options, onOptionsChange } = props;

  return (
    <>
      <div>PromSettings</div>
      
    </>
  );
};


