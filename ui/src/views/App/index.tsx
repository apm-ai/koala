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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Login from '../Login'


import './index.css';

import Layouts from 'src/views/layouts/index'


import Intl from './Intl'
import ConfigProvider from './ConfigProvider'

import darkVars from 'src/styles/dark.json';
import lightVars from 'src/styles/light.json';
import { StoreState } from 'src/types'

import { setDataSourceService, setBackendSrv } from 'src/packages/datav-core'
import { DatasourceSrv, getDatasourceSrv } from 'src/core/services/datasource'
import { backendSrv } from 'src/core/services/backend'

import { message } from 'antd';
import { TimeSrv, setTimeSrv } from 'src/core/services/time';
interface Props {
  theme: string
}

const UIApp = (props: Props) => {
  const { theme } = props

  useEffect(() => {
    let vars = theme === "light" ? lightVars : darkVars;
    const newVars = { ...vars, "a": "b" }
    window.less.modifyVars(newVars)
  }, [theme])

  // init datasource service
  initDatasourceService()

  // init backend service
  initBackendService()

  // init time service
  initTimeService()



  function initDatasourceService() {
    const ds = new DatasourceSrv()
    setDataSourceService(ds);

    testLoadDatasource()
  }


  async function testLoadDatasource() {
    try {
      const ds = await getDatasourceSrv().get('Prometheus');
      console.log("load prometheus ok:", ds)
    } catch (error) {
      message.error(error.message)
    }
  }

  function initBackendService() {
    setBackendSrv(backendSrv)
  }


  function initTimeService() {
    const ds = new TimeSrv()
    setTimeSrv(ds);
  }

  return (
    <Intl>
      <ConfigProvider>
        <Router>
          <Switch>
            <Route path="/ui" component={Layouts} />
            <Route path="/login" exact component={Login} />
            <Redirect to="/ui/dashboard" />
          </Switch>
        </Router>
      </ConfigProvider>
    </Intl>
  );
}

export const mapStateToProps = (state: StoreState) => ({
  theme: state.application.theme
});

export default connect(mapStateToProps)(UIApp);