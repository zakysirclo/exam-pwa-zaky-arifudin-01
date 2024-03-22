import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/notification/pages/list/core';
import Content from '@core_modules/notification/pages/list/components';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
    />
);

export default withApollo({ ssr: false })(withTranslation()(Page));
