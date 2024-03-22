/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable @next/next/no-img-element */
import Typography from '@common_typography';
import Button from '@common_button';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';
import { basePath } from '@config';
import { useTranslation } from 'next-i18next';

const Error = () => {
    const { t } = useTranslation(['common']);

    const appEnv = getAppEnv();

    const handleReload = () => {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    const handleBackToStore = () => {
        if (typeof window !== 'undefined') {
            window.location.replace(
                getStoreHost(appEnv || 'prod'),
            );
        }
    };

    return (
        <div className="">
            <img src={`${basePath}/assets/img/ghosts.png`} alt="ghost-error" className="" />
            <Typography variant="h1" type="bold">
                {t('checkout:error:title')}
            </Typography>
            <Typography variant="span" type="semiBold" color="gray" align="center">
                {t('checkout:error:message')}
            </Typography>
            <Button variant="plain" onClick={handleReload}>
                <Typography variant="title" type="semiBold" color="red">
                    {t('checkout:error:try')}
                </Typography>
            </Button>
            <Button variant="plain" onClick={handleBackToStore}>
                <Typography variant="span" type="semiBold">
                    {t('checkout:error:backToStore')}
                </Typography>
            </Button>
        </div>
    );
};

export default Error;
