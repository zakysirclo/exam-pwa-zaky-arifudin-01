import { withTranslation } from 'next-i18next';
import Core from '@core_modules/cms/pages/default/core';

const Page = (props) => (<Core {...props} />);

export default withTranslation()(Page);
