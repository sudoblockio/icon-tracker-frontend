import React from 'react';
import styles from './ErrorFallback.module.scss';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Oops! Something went wrong.</h1>
            <p className={styles.message}>{'An unexpected error occurred.'}</p>
            <button className={styles.retryButton} onClick={resetErrorBoundary}>
                Try Again
            </button>
        </div>
    );
};

export default ErrorFallback;
