import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/setting/pages/default/core';
import Content from '@core_modules/setting/pages/default/components';

const Page = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
