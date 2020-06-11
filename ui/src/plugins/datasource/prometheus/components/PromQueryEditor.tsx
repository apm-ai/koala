import React from 'react';

// Types
import {  QueryEditorProps } from 'src/packages/datav-core';


import { PrometheusDatasource } from '../datasource';
import { PromQuery, PromOptions } from '../types';

export type Props = QueryEditorProps<PrometheusDatasource, PromQuery, PromOptions>;




export const PromQueryEditor = (props: Props) => {
  // Use default query to prevent undefined input values
  const defaultQuery: Partial<PromQuery> = { expr: '', legendFormat: '', interval: '' };
  const query = Object.assign({}, defaultQuery, props.query);
  this.query = query;
  // Query target properties that are fully controlled inputs
  return (
    <div>
      prometheus query editor
    </div>
  );

}
