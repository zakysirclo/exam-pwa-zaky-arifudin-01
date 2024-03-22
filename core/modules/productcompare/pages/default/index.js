/* eslint-disable react/destructuring-assignment */
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/productcompare/pages/default/core';
import Content from '@core_modules/productcompare/pages/default/components';
import ViewSkeleton from '@core_modules/productcompare/pages/default/components/Skeleton/ViewSkeleton';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
        ViewSkeleton={ViewSkeleton}
        pageConfig={{
            title: props.t('common:productCompare:title'),
            header: false, // available values: "absolute", "relative", false (default)
            bottomNav: 'home',
            pageType: 'home',
        }}
    />
);

export default withApollo({ ssr: false })(withTranslation()(Page));
