import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/searchresult/pages/advanced/core';
import Content from '@core_modules/searchresult/components';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
    />
);

export default withApollo({ ssr: true })(withTranslation()(Page));
