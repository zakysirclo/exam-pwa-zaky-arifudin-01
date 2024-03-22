/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import Typography from '@common_typography';
import Button from '@common_button';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';
import { basePath } from '@config';

const Error = ({ t }) => {
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
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <img src={`${basePath}/assets/img/ghosts.png`} alt="ghost-error" className="desktop:max-w-[150px] tablet:max-w-[150px] mobile:max-w-[100px] h-auto -mr-[20px]" />
            <Typography variant="h1">
                {t('checkout:error:title')}
            </Typography>
            <Typography className="font-semibold text-neutral-250 text-center">
                {t('checkout:error:message')}
            </Typography>
            <Button variant="plain" onClick={handleReload}>
                <Typography className="font-semibold text-red-600">
                    {t('checkout:error:try')}
                </Typography>
            </Button>
            <Button variant="plain" onClick={handleBackToStore}>
                <Typography className="font-semibold">
                    {t('checkout:error:backToStore')}
                </Typography>
            </Button>
        </div>
    );
};

export default Error;
