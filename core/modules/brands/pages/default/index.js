import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/brands/pages/default/core';
import Content from '@core_modules/brands/pages/default/components';
import Skeleton from '@core_modules/brands/pages/default/components/skeleton';

const Default = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

export default withApollo({ ssr: true })(withTranslation()(Default));
