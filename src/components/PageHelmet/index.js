import React from 'react';
import { Helmet } from 'react-helmet';

const PageHelmet = ({ title, }) => {
    return (
        <Helmet>
            <title>ICON TRACKER | {title}</title>
        </Helmet>
    );
};

export default PageHelmet;