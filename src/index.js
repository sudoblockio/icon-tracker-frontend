import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import './style/css/font.css'
import './style/css/common.css'
import './style-custom/default.css'
import './style-custom/custom.css'
import './style-custom/shape.css'

import * as Sentry from "@sentry/react";
import config from './config'
import ErrorBoundary from './components/ErrorBoundary'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

Sentry.init({
    dsn: config.sentryDSN,
    integrations: process.env.NODE_ENV === 'production' ? [
        Sentry.browserTracingIntegration(),
        Sentry.browserProfilingIntegration(),
        Sentry.replayIntegration(),
        Sentry.reactRouterV4BrowserTracingIntegration({ history })
    ] : [],
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.0,
    tracePropagationTargets: process.env.NODE_ENV === 'production' ?
        [/^https:\/\/tracker\.icon\.community/] : [],
    replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.0,
    replaysOnErrorSampleRate: process.env.NODE_ENV === 'production' ? 1.0 : 0.0,
});

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById('root')
)
