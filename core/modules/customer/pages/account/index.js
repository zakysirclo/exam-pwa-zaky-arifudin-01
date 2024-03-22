import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';

const Core = dynamic(() => import('@core_modules/customer/pages/account/core'), { ssr: false });
const CustomerView = dynamic(() => import('@core_modules/customer/pages/account/components/Customer/view'), { ssr: false });
const GuestView = dynamic(() => import('@core_modules/customer/pages/account/components/Guest'), { ssr: false });

const Page = (props) => <Core {...props} CustomerView={CustomerView} GuestView={GuestView} />;

export default withApollo({ ssr: true })(withTranslation()(Page));
