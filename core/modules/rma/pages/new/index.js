import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Skeleton from '@core_modules/rma/pages/new/components/Skeleton';
import CoreBase from '@core_modules/rma/pages/new/core';
import WarningInfo from '@core_modules/rma/pages/new/components/Info';
import ItemProductView from '@core_modules/rma/pages/new/components/ItemProduct/views';
import ItemFieldView from '@core_modules/rma/pages/new/components/ItemField/view';
import OtherRmaLink from '@core_modules/rma/pages/new/components/ItemProduct/views/OtherRmaLink';

const Page = (props) => (
    <CoreBase
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProductView={ItemProductView}
        ItemFieldView={ItemFieldView}
        OtherRmaLink={OtherRmaLink}
        {...props}
    />
);

export default withApollo({ ssr: false })(withTranslation()(Page));
