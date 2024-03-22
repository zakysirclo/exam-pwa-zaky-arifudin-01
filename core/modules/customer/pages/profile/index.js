import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';

const Core = dynamic(() => import('@core_modules/customer/pages/profile/core'), { ssr: false });
const Skeleton = dynamic(() => import('@core_modules/customer/pages/profile/components/skeleton'), { ssr: false });
const Content = dynamic(() => import('@core_modules/customer/pages/profile/components'), { ssr: false });

const Page = (props) => <Core {...props} Content={Content} Skeleton={Skeleton} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
