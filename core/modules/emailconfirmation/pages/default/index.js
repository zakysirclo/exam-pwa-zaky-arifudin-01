import { withApollo } from '@lib_apollo';
import Backdrop from '@common_backdrop';
import { withTranslation } from 'next-i18next';
import Core from '@core_modules/emailconfirmation/pages/default/core';

const Content = () => <Backdrop open />;

const Page = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
