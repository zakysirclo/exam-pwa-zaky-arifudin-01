import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/order/pages/print/core';
import Content from '@core_modules/order/pages/print/components';
import Skeleton from '@core_modules/order/pages/detail/components/skeleton';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
