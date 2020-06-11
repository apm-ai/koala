import {VariableModel, AdHocVariableModel } from 'src/types/templating';

export const isAdHoc = (model: VariableModel): model is AdHocVariableModel => {
    return model.type === 'adhoc';
  };