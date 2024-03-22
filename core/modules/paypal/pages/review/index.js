/* eslint-disable react/destructuring-assignment */
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/paypal/pages/review/core';

const Page = (props) => (
    <Core
        {...props}
        pageConfig={{
            title: props.t('checkout:paypal:reviewPage'),
            header: 'relative', // available values: "absolute", "relative", false (default)
            headerTitle: props.t('checkout:paypal:reviewPage'),
            pageType: 'checkout',
        }}
    />
);

export default withApollo({ ssr: true })(withTranslation()(Page));
