import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';

const Core = dynamic(() => import('@core_modules/customer/pages/newsletter/core'), { ssr: false });
const Content = dynamic(() => import('@core_modules/customer/pages/newsletter/components'), { ssr: false });

const Page = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
