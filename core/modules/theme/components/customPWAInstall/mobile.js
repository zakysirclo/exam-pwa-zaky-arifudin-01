import React from 'react';
import Typography from '@common_typography';
import TagManager from 'react-gtm-module';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import Button from '@common_button';
import Image from '@common_image';
import cx from 'classnames';

const MobileInstall = (props) => {
    const { appName, installMessage, storeConfig } = props;
    const handleClickInstallApp = () => {
        const timestamp = Date.now();
        const identifier = `${Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100)}_${timestamp}`;
        const dataLayer = {
            event: 'countPopupInstallation',
            eventCategory: 'Count Popup Installation',
            eventAction: 'Installed',
            eventLabel: 'installPWA',
            eventValue: identifier,
        };
        TagManager.dataLayer({ dataLayer });
    };

    const closePopup = () => {
        const el = document.getElementById('wrapper-mobile__install');
        // hidden popup
        if (el) {
            el.style.display = 'none';
        }

        const date = new Date();
        // add a day
        date.setDate(date.getDate() + 1);
        localStorage.setItem('hideInstallPopup', true);
        localStorage.setItem('expiredHideInstallPopup', date.getDate());
    };

    return (
        <div
            className={cx(
                'float-header-mobile__content--popup-installation',
                'py-3',
                'px-4',
                'flex',
                'flex-row',
                'gap-x-[10px]',
                'fixed',
                'bottom-0',
                'z-10',
                'w-[100vw]',
                'bg-neutral-white',
                'hidden',
            )}
            id="wrapper-mobile__install"
        >
            <div className={cx('install_image', 'basis-10', 'shrink-0', 'flex', 'items-center', 'justify-center')}>
                <Image src="/assets/img/mobile_install_logo.png" alt={appName} width={30} height={32} storeConfig={storeConfig} />
            </div>
            <div className={cx('install_info', 'basis-full')}>
                <Typography variant="bd-3a" className={cx('text-neutral-700', 'block')}>
                    {appName}
                </Typography>
                <Typography variant="bd-3a" className={cx('text-[12px]', 'text-neutral-500', 'text-xs', 'font-normal', 'leading-sm')}>
                    {installMessage}
                </Typography>
            </div>
            <div className={cx('install_button', 'flex', 'items-center')}>
                <Button
                    className={cx('m-0', 'hover:shadow-none', 'focus:shadow-none', 'active:shadow-none', 'active:shadow-none', 'px-4', 'py-[5px]')}
                    onClick={handleClickInstallApp}
                    variant="primary"
                    id="btn-install__mobile"
                >
                    <Typography className={cx('!text-neutral-white')}>Install</Typography>
                </Button>
                <Button
                    className={cx('m-0', '!px-0', '!pl-1', 'hover:shadow-none', 'focus:shadow-none', 'active:shadow-none', 'active:shadow-none')}
                    onClick={closePopup}
                    icon={<XMarkIcon />}
                    iconProps={{ className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]') }}
                    iconOnly
                    variant="tertiary"
                    classNameText={cx('!text-neutral-700')}
                />
            </div>
        </div>
    );
};

export default MobileInstall;
