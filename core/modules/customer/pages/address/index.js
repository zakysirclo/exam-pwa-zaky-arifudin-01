import { withApollo } from '@lib_apollo';
import { withTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const Core = dynamic(() => import('@core_modules/customer/pages/address/core'), { ssr: false });

const Page = (props) => <Core {...props} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
