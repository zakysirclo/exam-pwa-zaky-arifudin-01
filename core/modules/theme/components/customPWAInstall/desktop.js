/* eslint-disable no-unused-vars */
import Button from '@common_button';
import TagManager from 'react-gtm-module';
import DevicePhoneMobileIcon from '@heroicons/react/24/solid/DevicePhoneMobileIcon';
import Typography from '@common_typography';
import cx from 'classnames';

const DesktopInstall = ({ id = 'wrapper-desktop__install', t, CustomButton }) => {
    const onClick = () => {
        const timestamp = Date.now();
        const identifier = `${(Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100))}_${timestamp}`;
        const dataLayer = {
            event: 'countPopupInstallation',
            eventCategory: 'Count Popup Installation',
            eventAction: 'Installed',
            eventLabel: 'installPWA',
            eventValue: identifier,
        };
        TagManager.dataLayer({ dataLayer });
    };

    return (
        <div className={cx('top-header__content__popup-installation')} id={id}>
            {
                React.isValidElement(CustomButton)
                    ? React.cloneElement(CustomButton, {
                        onClick,
                        icon: <DevicePhoneMobileIcon />,
                        iconProps: { className: cx('w-[20px]', 'text-neutral-600', 'inline-block'), ...(CustomButton.props.iconProps || {}) },
                        iconPosition: 'left',
                        classNameText: cx('!text-neutral-700'),
                        className: cx(CustomButton.props.className, 'hidden'),
                        children: CustomButton.props.children || <Typography>{t('common:header:downloadApps')}</Typography>,
                    })
                    : (
                        <Button
                            className={cx(
                                'm-2',
                                '!px-0',
                                '!py-0',
                                '!ml-0',
                                'hover:shadow-none',
                                'focus:shadow-none',
                                'active:shadow-none',
                                'active:shadow-none',
                                'hidden',
                            )}
                            onClick={onClick}
                            icon={<DevicePhoneMobileIcon />}
                            iconProps={{ className: cx('w-[20px]', 'text-neutral-600', 'inline-block') }}
                            iconPosition="left"
                            variant="tertiary"
                            classNameText={cx('!text-neutral-700')}
                        >
                            <Typography>{t('common:header:downloadApps')}</Typography>
                        </Button>
                    )
            }
        </div>
    );
};

export default DesktopInstall;
