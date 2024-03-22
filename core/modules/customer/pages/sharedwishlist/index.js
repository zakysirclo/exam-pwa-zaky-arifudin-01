/* eslint-disable react/destructuring-assignment */
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/sharedwishlist/core';
import Content from '@core_modules/customer/pages/sharedwishlist/components';
import SharedSkeleton from '@core_modules/customer/pages/sharedwishlist/components/Skeleton/SharedSkeleton';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
        SharedSkeleton={SharedSkeleton}
        pageConfig={{
            title: props.t('customer:wishlist:pageTitle'),
            header: false, // available values: "absolute", "relative", false (default)
            bottomNav: 'home',
            pageType: 'home',
        }}
    />
);

export default withApollo({ ssr: true })(withTranslation()(Page));
