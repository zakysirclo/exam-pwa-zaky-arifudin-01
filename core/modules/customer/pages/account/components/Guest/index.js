// Library
import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@common_footer'), { ssr: false });

const WihtOut = (props) => {
    const styles = {};
    const { t, storeConfig } = props;

    return (
        <div className={styles.root}>
            <div className={styles.authBlock}>
                <Typography variant="span">{t('customer:haveAccount')}</Typography>
                <Button fullWidth className={styles.btnSigin} href="/customer/account/login">
                    <Typography variant="span" type="bold" letter="uppercase" color="white">
                        {t('common:button:login')}
                    </Typography>
                </Button>
                <Typography variant="span">{t('customer:notHaveAccount')}</Typography>
                <Button fullWidth className={styles.btnSigin} variant="outlined" href="/customer/account/create">
                    <Typography variant="span" type="bold" letter="uppercase">
                        {t('common:button:register')}
                    </Typography>
                </Button>
            </div>
            {storeConfig?.pwa?.enabler_footer_mobile === false && (
                <div className="hidden-desktop">
                    <Footer storeConfig={storeConfig} t={t} />
                </div>
            )}
        </div>
    );
};

export default WihtOut;
