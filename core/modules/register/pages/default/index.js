import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/register/pages/default/core';
import Content from '@core_modules/register/pages/default/components';

const Page = (props) => (<Core {...props} Content={Content} />);

export default withApollo({ ssr: true })(withTranslation()(Page));
