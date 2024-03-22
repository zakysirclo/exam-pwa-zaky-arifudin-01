import dynamic from 'next/dynamic';
import { footerVersion } from '@config';

const FooterList = {
    pwa_footer_v1: dynamic(() => import('@core_modules/theme/components/footer/desktop/components/v1'), { ssr: true }),
    pwa_footer_v2: dynamic(() => import('@core_modules/theme/components/footer/desktop/components/v2'), { ssr: true }),
};

const FooterView = (props) => {
    const {
        t, error,
    } = props;
    const Footer = FooterList[footerVersion];

    if (error) {
        return <div className="m-15 p-2 bg-red-500 text-neutral-white">{t('common:error:fetchError')}</div>;
    }

    return <Footer {...props} />;
};

export default FooterView;
