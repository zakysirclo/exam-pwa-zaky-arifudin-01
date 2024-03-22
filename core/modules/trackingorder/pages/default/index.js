import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/trackingorder/pages/default/core';

const DefaultTracking = (props) => <Core {...props} />;

export default withApollo({ ssr: true })(withTranslation()(DefaultTracking));
