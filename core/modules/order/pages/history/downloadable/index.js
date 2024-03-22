import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';

const Core = dynamic(() => import('@core_modules/order/pages/history/downloadable/core'), { ssr: false });
const Content = dynamic(() => import('@core_modules/order/pages/history/components/downloadable'), { ssr: false });

const DefaultOrder = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
