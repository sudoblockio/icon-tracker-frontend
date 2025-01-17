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

Sentry.init({
    dsn: config.sentryDSN,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.browserProfilingIntegration(),
        Sentry.replayIntegration(),
    ],
    environment: config.network,
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    profilesSampleRate: 1.0,
    // Set profilesSampleRate to 1.0 to profile every transaction.
    // Since profilesSampleRate is relative to tracesSampleRate,
    // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
    // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
    // results in 25% of transactions being profiled (0.5*0.5=0.25)
    // Session Replay
    replaysSessionSampleRate: 0.1,
    // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0,
    // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)
