import Layout from '@layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { setCartId } from '@helper_cartid';
import { getLoginInfo } from '@helper_auth';
import { reOrder as mutationReorder, getCmsBlocks } from '@core_modules/customer/services/graphql';
import { footerVersion } from '@config';

const Customer = dynamic(() => import('@core_modules/customer/pages/account/components/Customer'), { ssr: false });

const CustomerAccount = (props) => {
    const {
        t, CustomerView, GuestView,
    } = props;
    const isLogin = getLoginInfo();
    const router = useRouter();
    const config = {
        title: t('customer:dashboard:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'account',
        tagSelector: isLogin ? 'swift-page-dashboard' : 'swift-page-guest-view',
    };
    const [actionReorder] = mutationReorder();
    const { data } = getCmsBlocks({ identifiers: [footerVersion] }, {
        skip: typeof window === 'undefined' || !footerVersion,
    });

    const reOrder = (order_id) => {
        if (order_id && order_id !== '') {
            window.backdropLoader(true);
            actionReorder({
                variables: {
                    order_id,
                },
            })
                .then(async (res) => {
                    if (res.data && res.data.reorder && res.data.reorder.cart_id) {
                        await setCartId(res.data.reorder.cart_id);
                        setTimeout(() => {
                            router.push('/checkout/cart');
                        }, 1000);
                    }
                    window.backdropLoader(false);
                })
                .catch(() => {
                    window.backdropLoader(false);
                });
        }
    };

    if (isLogin) {
        return (
            <Layout pageConfig={config} {...props}>
                <Customer {...props} data={data} CustomerView={CustomerView} reOrder={reOrder} />
            </Layout>
        );
    }
    return (
        <Layout pageConfig={config} {...props}>
            <GuestView {...props} data={data} />
        </Layout>
    );
};

export default CustomerAccount;
