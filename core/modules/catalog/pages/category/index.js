import Core from '@core_modules/catalog/pages/category/core';
import { withTranslation } from 'next-i18next';

const CategoryPage = (props) => (
    <Core
        {...props}
    />
);

export default withTranslation()(CategoryPage);
