import { withTranslation } from 'next-i18next';
import Content from '@core_modules/product/pages/default/components';
import Core from '@core_modules/product/pages/default/core';

const Page = (props) => (
    <Core {...props} Content={Content} />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'product', 'category', 'validate', 'catalog'],
});

export default withTranslation()(Page);
