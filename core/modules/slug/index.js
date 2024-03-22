import { withApollo } from '@lib_apollo';
import { withTranslation } from 'next-i18next';
import Core from '@core_modules/slug/core';

const Page = (props) => (
    <Core
        {...props}
    />
);

/**
 * get slug from query
 * namespacesRequired empty because Catalog page using product and category so only on component
 */

export default withApollo({ ssr: true })(withTranslation()(Page));
