import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';

const Core = dynamic(() => import('@core_modules/rma/pages/history/core'), { ssr: false });
const Content = dynamic(() => import('@core_modules/rma/pages/history/components'), { ssr: false });

const Page = (props) => <Core Content={Content} {...props} />;

export default withApollo({ ssr: true })(withTranslation()(Page));
