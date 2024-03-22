import Content from '@core_modules/order/pages/detail/components';
import Skeleton from '@core_modules/order/pages/detail/components/skeleton';
import Core from '@core_modules/order/pages/detail/core';
import { withApollo } from '@lib_apollo';
import { withTranslation } from 'next-i18next';

const DefaultOrder = (props) => <Core {...props} Content={Content} Skeleton={Skeleton} />;

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
