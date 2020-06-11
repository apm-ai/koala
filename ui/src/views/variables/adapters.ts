import {VariableModel,VariableOption,VariablePickerProps,VariableEditorProps,
  AdHocVariableModel,IntervalVariableModel,CustomVariableModel,DataSourceVariableModel,QueryVariableModel,
  TextBoxVariableModel,ConstantVariableModel} from 'src/types/templating'
import { Registry, UrlQueryValue, VariableType } from 'src/packages/datav-core';
import { ComponentType } from 'react';
import { Reducer } from 'redux';
import { VariablesState } from './state/variablesReducer';

export interface VariableAdapter<Model extends VariableModel> {
    id: VariableType;
    description: string;
    name: string;
    initialState: Model;
    dependsOn: (variable: Model, variableToTest: Model) => boolean;
    setValue: (variable: Model, option: VariableOption, emitChanges?: boolean) => Promise<void>;
    setValueFromUrl: (variable: Model, urlValue: UrlQueryValue) => Promise<void>;
    updateOptions: (variable: Model, searchFilter?: string) => Promise<void>;
    getSaveModel: (variable: Model) => Partial<Model>;
    getValueForUrl: (variable: Model) => string | string[];
    picker: ComponentType<VariablePickerProps>;
    editor: ComponentType<VariableEditorProps>;
    reducer: Reducer<VariablesState>;
  }
export type VariableTypeRegistry<Model extends VariableModel = VariableModel> = Registry<VariableAdapter<Model>>;
export const variableAdapters: VariableTypeRegistry = new Registry<VariableAdapter<VariableModels>>();

export type VariableModels =
  | QueryVariableModel
  | CustomVariableModel
  | TextBoxVariableModel
  | ConstantVariableModel
  | DataSourceVariableModel
  | IntervalVariableModel
  | AdHocVariableModel;
