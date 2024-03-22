import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Content from '@core_modules/customer/pages/newpassword/components';
import Core from '@core_modules/customer/pages/newpassword/core';

const Page = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
