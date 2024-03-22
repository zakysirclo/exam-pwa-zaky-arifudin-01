import Core from '@core_modules/seller/pages/default/core';
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';

const Page = (props) => <Core {...props} />;

export default withApollo({ ssr: true })(withTranslation()(Page));
