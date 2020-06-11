import { VariableModel as BaseVariableModel } from 'src/packages/datav-core';
import { Deferred } from 'src/core/library/utils/deferred'

export interface TemplatingState {
  variables: Record<string, VariableModel>;
}

export interface VariablePickerProps<Model extends VariableModel = VariableModel> {
  variable: Model;
}

export interface VariableModel extends BaseVariableModel {
  id?: string; // only exists for variables in redux state
  global?: boolean; // only exists for variables in redux state
  hide: VariableHide;
  skipUrlSync: boolean;
  index?: number;
  initLock?: Deferred | null;
}


export enum VariableHide {
  dontHide,
  hideLabel,
  hideVariable,
}


export interface AdHocVariableFilter {
  key: string;
  operator: string;
  value: string;
  condition: string;
}

export interface AdHocVariableModel extends VariableModel {
  datasource: string | null;
  filters: AdHocVariableFilter[];
}

export interface VariableTag {
  selected: boolean;
  text: string | string[];
  values?: any[];
  valuesText?: string;
}
export interface VariableOption {
  selected: boolean;
  text: string | string[];
  value: string | string[];
  isNone?: boolean;
  tags?: VariableTag[];
}

export interface OnPropChangeArguments<Model extends VariableModel = VariableModel> {
  propName: keyof Model;
  propValue: any;
  updateOptions?: boolean;
}



export enum VariableSort {
  disabled,
  alphabeticalAsc,
  alphabeticalDesc,
  numericalAsc,
  numericalDesc,
  alphabeticalCaseInsensitiveAsc,
  alphabeticalCaseInsensitiveDesc,
}

export interface VariableEditorProps<Model extends VariableModel = VariableModel> {
  variable: Model;
  onPropChange: (args: OnPropChangeArguments<Model>) => void;
}

export interface QueryVariableModel extends DataSourceVariableModel {
  datasource: string | null;
  definition: string;
  sort: VariableSort;
  tags: VariableTag[];
  tagsQuery: string;
  tagValuesQuery: string;
  useTags: boolean;
  queryValue?: string;
}

export interface AdHocVariableModel extends VariableModel {
  datasource: string | null;
  filters: AdHocVariableFilter[];
}

export enum VariableRefresh {
  never,
  onDashboardLoad,
  onTimeRangeChanged,
}

export interface IntervalVariableModel extends VariableWithOptions {
  auto: boolean;
  auto_min: string;
  auto_count: number;
  refresh: VariableRefresh;
}

export interface CustomVariableModel extends VariableWithMultiSupport {}

export interface DataSourceVariableModel extends VariableWithMultiSupport {
  regex: string;
  refresh: VariableRefresh;
}

export interface TextBoxVariableModel extends VariableWithOptions {}

export interface ConstantVariableModel extends VariableWithOptions {}

export interface VariableWithOptions extends VariableModel {
  current: VariableOption;
  options: VariableOption[];
  query: string;
}

export interface VariableWithMultiSupport extends VariableWithOptions {
  multi: boolean;
  includeAll: boolean;
  allValue?: string | null;
}
