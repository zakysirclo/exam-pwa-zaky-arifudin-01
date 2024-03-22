import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';

const Core = dynamic(() => import('@core_modules/productreview/pages/default/core'), { ssr: false });
const Content = dynamic(() => import('@core_modules/productreview/pages/default/components'), { ssr: false });

const MyProductReview = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: true })(withTranslation()(MyProductReview));
