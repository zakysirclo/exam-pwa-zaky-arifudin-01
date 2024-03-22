import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';

// import ItemView from '@core_modules/cart/pages/default/components/item';
// import EmptyView from '@core_modules/cart/pages/default/components/empty';
// import CrossSellView from '@core_modules/cart/pages/default/components/crosssell/view';
// import SkeletonCart from '@core_modules/cart/pages/default/components/skeleton';
// import EditDrawerView from '@core_modules/cart/pages/default/components/editDrawer';
// import PromoModalItemView from '@core_modules/checkout/pages/default/components/PromoModalItem/view';

const Core = dynamic(() => import('./core'), { ssr: false });

const Page = (props) => (
    <Core
        {...props}
    />
);

export default withApollo({ ssr: true })(withTranslation()(Page));
