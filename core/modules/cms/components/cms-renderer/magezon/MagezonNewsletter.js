import NewsletterForm from '@plugin_newsletter';
import React from 'react';

const MagezonNewsletter = (props) => {
    const { disable_element } = props;
    if (!disable_element) {
        return <NewsletterForm isCms {...props} />;
    }
    return null;
};

export default MagezonNewsletter;
