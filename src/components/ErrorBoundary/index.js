import React from 'react';
import * as Sentry from '@sentry/react';
import ErrorFallback from './ErrorFallback';


const ErrorBoundary = ({ children }) => {
    return (
        <Sentry.ErrorBoundary
            fallback={({ error, resetErrorBoundary }) => (
                <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
            )}
            onError={(error, errorInfo) => {
                Sentry.captureException(error, { extra: errorInfo });
            }}
        >
            {children}
        </Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
