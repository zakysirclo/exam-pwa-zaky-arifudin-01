/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import { modules } from '@config';

const Home = dynamic(() => import('@core_modules/home/pages/default/core'));
const Checkout = dynamic(() => import('@module_checkout/pages/default'));

const Page = (props) => {
    if (!modules.checkout.checkoutOnly) return <Home {...props} />;

    return <Checkout {...props} />;
};

export default withApollo({ ssr: true })(withTranslation()(Page));
