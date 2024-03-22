import Content from '@core_modules/thanks/pages/default/components';
import Skeleton from '@core_modules/thanks/pages/default/components/Loader';
import CoreMultiseller from '@core_modules/thanks/pages/default/components/multiseller';
import Core from '@core_modules/thanks/pages/default/core';
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';

const Page = (props) => {
    const { storeConfig } = props;
    if (storeConfig.enable_oms_multiseller === '1' || storeConfig.enable_oms_multiseller === 1) {
        return (
            <CoreMultiseller
                {...props}
            />
        );
    }
    return (
        <Core
            Skeleton={Skeleton}
            Content={Content}
            {...props}
        />
    );
};

export default withApollo({ ssr: true })(withTranslation()(Page));
