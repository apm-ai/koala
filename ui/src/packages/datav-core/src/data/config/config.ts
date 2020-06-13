import { DatavConfig, DataSourceInstanceSettings } from '../types'
// default config settings
export const defaultConfig: DatavConfig = {
    panel: { newTitle: 'Panel Title' },
    dashboard: { newTitle: 'New Dashboard Copy' },
    application: {
        startDate: () => 'now-3h',
        endDate: () => 'now',
        theme: 'light',
        locale: 'en_US'
    },
    user: {
        avatarUrl: ''
    }
}

// runtime config settings, most setted by user
export const config = {
    baseUrl: 'http://localhost:9085/',
    minRefreshInterval: '5s',
    exploreEnabled: true,
    viewersCanEdit: false,
    defaultDatasource: 'Prometheus',
    timePicker: {
        time : {from: "now-1h", to: "now"},
        refresh: '',
        timezone: 'browser'
    },
    featureToggles:  {
        transformations: false,
        expressions: false,
        newEdit: false,
        meta: false,
        newVariables: true,
    },
    datasources: {
        "Prometheus": {
            "id": 1,
            "jsonData": {
                "directUrl": "http://10.77.64.59:9090",
                "disableMetricsLookup": false,
                "httpHeaderName1": "testHeader",
                "httpHeaderName2": "",
                "httpMethod": "GET",
                "keepCookies": [
                    "testCookie"
                ],
                "queryTimeout": "60s",
                "timeInterval": "15s"
            },
            "meta": {
                "type": "datasource",
                "name": "Prometheus",
                "id": "prometheus",
                "info": {
                    "author": {
                        "name": "Grafana Labs",
                        "url": "https://grafana.com"
                    },
                    "description": "Open source time series database & alerting",
                    "links": [
                        {
                            "name": "Learn more",
                            "url": "https://prometheus.io/"
                        }
                    ],
                    "logos": {
                        "small": "src/plugins/datasource/prometheus/img/prometheus_logo.svg",
                        "large": "src/plugins/datasource/prometheus/img/prometheus_logo.svg"
                    },
                    "build": {
                    },
                    "screenshots": null,
                    "version": "",
                    "updated": ""
                },
                "dependencies": {
                    "grafanaVersion": "*",
                    "plugins": [
                    ]
                },
                "includes": [
                    {
                        "name": "Prometheus Stats",
                        "path": "dashboards/prometheus_stats.json",
                        "type": "dashboard",
                        "component": "",
                        "role": "Viewer",
                        "addToNav": false
                    },
                    {
                        "name": "Prometheus 2.0 Stats",
                        "path": "dashboards/prometheus_2_stats.json",
                        "type": "dashboard",
                        "component": "",
                        "role": "Viewer",
                        "addToNav": false
                    },
                    {
                        "name": "Grafana Stats",
                        "path": "dashboards/grafana_stats.json",
                        "type": "dashboard",
                        "component": "",
                        "role": "Viewer",
                        "addToNav": false
                    }
                ],
                "module": "src/plugins/datasource/prometheus/module",
                "baseUrl": "src/plugins/datasource/prometheus",
                "category": "tsdb",
                "preload": false,
                "signature": "internal",
                "annotations": true,
                "metrics": true,
                "alerting": true,
                "explore": false,
                "tables": false,
                "logs": false,
                "tracing": false,
                "queryOptions": {
                    "minInterval": true
                },
                "routes": null,
                "streaming": false
            },
            "name": "Prometheus",
            "type": "prometheus",
            "uid": "1q-s0hiGk",
            "url": "/api/datasources/proxy/1"
        } as DataSourceInstanceSettings
    } 
}