import React from 'react';
import * as Sentry from '@sentry/react';
import ErrorFallback from './ErrorFallback';


const ErrorBoundary = ({ children }) => {
    function handleError(error, errorInfo) {
        console.log({ error, errorInfo })
        Sentry.captureException(error, { extra: errorInfo });
    }

    return (
        <Sentry.ErrorBoundary
            fallback={({ error, resetErrorBoundary }) => (
                <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
            )}
            onError={handleError}
        >
            {children}
        </Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
