// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
// eslint-disable-next-line import/order, import/no-unresolved
import UIApp from './views/App';



// these need to go after the App import
/* eslint-disable import/first */
import 'u-basscss/css/flexbox.css';
import 'u-basscss/css/layout.css';
import 'u-basscss/css/margin.css';
import 'u-basscss/css/padding.css';
import 'u-basscss/css/position.css';
import 'u-basscss/css/typography.css';

import 'react-grid-layout/css/styles.css'

const UI_ROOT_ID = 'apm-ui-root';

import './styles/main.less'
import './index.less';




import { configureStore } from 'src/store/configureStore'
function initReactDOM() {
  const store = configureStore();
  ReactDOM.render(
    <ReduxProvider store={store}>
      <UIApp />
    </ReduxProvider>
    , document.getElementById(UI_ROOT_ID));
}

// init react dom
initReactDOM()


import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

