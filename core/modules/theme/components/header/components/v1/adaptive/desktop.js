/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from '@common_image';
import Typography from '@common_typography';
import config from '@config';

import Button from '@common_button';

import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

import Drawer from '@common_drawer';
import Tabs from '@common_tabs';
import useMediaQuery from '@core/hooks/useMediaQuery';

const Autocomplete = dynamic(() => import('@core_modules/theme/components/header/components/autocomplete'), { ssr: true });
const Menu = dynamic(() => import('@core_modules/theme/components/header/components/v1/mcategory'), { ssr: true });
const ProductCompareIcon = dynamic(() => import('@core_modules/catalog/plugins/ProductCompare'), { ssr: true });
const ShoppingBagIcon = dynamic(() => import('@plugin_shoppingbag'), { ssr: true });
const NotificationBell = dynamic(() => import('@plugin_notificationbell'), { ssr: true });
const SwitcherCurrency = dynamic(() => import('@common_currency'), { ssr: false });
const SwitcherLanguage = dynamic(() => import('@common_language'), { ssr: false });
const UserInfo = dynamic(() => import('@core_modules/theme/components/header/components/v1/adaptive/plugin/userinfo'), { ssr: false });
const InstallDesktop = dynamic(() => import('@core_modules/theme/components/customPWAInstall/desktop'), { ssr: true });
const BurgerMenuCategories = dynamic(() => import('@core_modules/theme/components/header/components/burgermenu/categories'), { ssr: false });
const BurgerMenuAccount = dynamic(() => import('@core_modules/theme/components/header/components/burgermenu/account'), { ssr: false });
const DesktopHeader = (props) => {
    const {
        //
        t,
        storeConfig,
        isLogin,
        customer,
        setValue,
        handleSearch,
        dataMenu,
        loadingMenu,
        handleLogout,
        deviceWidth,
        cmsMenu,
        ...other
    } = props;
    const { modules } = config;
    const { isDesktop, isMobile } = useMediaQuery();

    const logoDimensions = {
        width: storeConfig?.logo_width || (isDesktop ? 120 : 74),
        height: storeConfig?.logo_height || (isDesktop ? 52 : 34),
    };
    const logoAdditionalProps = {};
    if (!isMobile) {
        logoAdditionalProps.styleContainer = {
            width: `${logoDimensions.width}px`,
            height: `${logoDimensions.height}px`,
            paddingTop: 0,
        };
    }

    const [open, setOpen] = React.useState(false);
    const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false);
    const [localOpen, setLocalOpen] = React.useState(false);
    const [isSearchShown, setIsSearchShown] = React.useState(false);

    const handleClose = () => {
        setLocalOpen(false);
        setTimeout(() => {
            setOpenBurgerMenu(false);
        }, 500);
    };

    useEffect(() => {
        setLocalOpen(openBurgerMenu);
    }, [openBurgerMenu]);

    const filteredData = dataMenu?.categories?.items[0]?.children.filter((item) => item.include_in_menu !== 0);
    const burgerMenuData = [
        {
            title: 'Menu',
            content: dataMenu && <BurgerMenuCategories data={filteredData} cmsMenu={cmsMenu} />,
            type: 'react-component',
        },
        {
            title: 'Account',
            content: <BurgerMenuAccount isLogin={isLogin} handleLogout={handleLogout} {...other} />,
            type: 'react-component',
        },
    ];

    const PopoverContent = () => {
        return (
            <ul className={cx('my-account-list__wrapper')}>
                <li key={0} className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}>
                    <Link href="/customer/account">
                        <Typography className={cx('currency-list__text', 'text-neutral-700')}>My Account</Typography>
                    </Link>
                </li>
                <li key={1} className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}>
                    <Link href="/wishlist">
                        <Typography className={cx('currency-list__text', 'text-neutral-700')}>My Wish List</Typography>
                    </Link>
                </li>
                <li key={2} className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}>
                    <Link href="/catalog/product_compare">
                        <Typography className={cx('currency-list__text', 'text-neutral-700')}>Compare Products</Typography>
                    </Link>
                </li>
                <li
                    key={3}
                    className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}
                    onClick={() => handleLogout()}
                >
                    <Typography className={cx('currency-list__text', 'text-primary-700')}>Log Out</Typography>
                </li>
            </ul>
        );
    };

    return (
        <div className={cx('desktop-header', 'transition-transform', 'delay-300', 'duration-500', 'ease-in-out', 'shadow-md')}>
            <div
                id="top-header"
                className={cx('top-header', 'tablet:border-b', 'tablet:border-b-neutral-200', 'py-[1px]', 'min-h-[40px]', 'mobile:max-tablet:hidden')}
            >
                <div
                    id="top-header__content"
                    className={cx(
                        'top-header__content',
                        'grid grid-cols-[75%_25%]',
                        'tablet:max-w-screen-tablet desktop:max-w-screen-desktop',
                        'm-[0_auto]',
                        'desktop:px-10 tablet:px-6 mobile:px-4',
                    )}
                >
                    <InstallDesktop t={t} />
                    {!isMobile ? (
                        <div
                            className={cx(
                                'top-header__content--currency-language-changer-menu',
                                'flex',
                                'flex-wrap',
                                'flex-column',
                                'justify-end',
                                'gap-x-4',
                            )}
                        >
                            <SwitcherCurrency {...props} />
                            <SwitcherLanguage {...props} />
                        </div>
                    ) : null}
                </div>
            </div>
            <div className={cx('middle-header', 'tablet:border-b-[1.5px]', 'tablet:border-b-neutral-200', 'tablet:py-4')}>
                <div
                    className={cx(
                        'middle-header__wrapper',
                        'm-[0_auto]',
                        'flex',
                        'flex-row',
                        'justify-between',
                        'tablet:max-w-screen-tablet',
                        'desktop:gap-x-5',
                        'px-4',
                        'tablet:px-6',
                        'desktop:gap-x-6',
                        'desktop:max-w-screen-desktop',
                        'desktop:px-10',
                        'mobile:max-tablet:grid',
                        'mobile:max-tablet:grid-cols-[4fr_8fr_4fr]',
                        'mobile:max-tablet:max-w-[100%]',
                    )}
                >
                    {!isDesktop ? (
                        <div className={cx('middle-header-tablet__burger-menu', 'desktop:hidden')}>
                            <Button
                                className={cx(
                                    'my-2',
                                    '!p-0',
                                    '!mx-0',
                                    'hover:shadow-none',
                                    'focus:shadow-none',
                                    'active:shadow-none',
                                    'active:shadow-none',
                                )}
                                onClick={() => {
                                    setOpenBurgerMenu(true);
                                }}
                                icon={<Bars3Icon />}
                                iconProps={{ className: cx('text-neutral-700', 'w-[24px]', 'h-[24px]') }}
                                iconOnly
                                variant="tertiary"
                                classNameText={cx('!text-neutral-700')}
                            />
                            {dataMenu && openBurgerMenu && (
                                <Drawer
                                    open={localOpen}
                                    handleClose={handleClose}
                                    position="left"
                                    className={cx('mobile:max-tablet:w-[280px]', 'tablet:max-desktop:w-[396px]', 'desktop:w-[540px]', {
                                        'animate-hamburger-drawer-in': localOpen,
                                        'animate-hamburger-drawer-out': !localOpen,
                                    })}
                                    customButtonClose
                                    backdrop
                                >
                                    <Tabs
                                        data={burgerMenuData}
                                        tabHasContent
                                        tabWrapperClassName={cx('border-none')}
                                        tabTitleWrapperClassName={cx('grid', 'grid-cols-2')}
                                        tabTitleClassName={cx('border-none', '!text-neutral-700', 'text-2md', 'font-semibold')}
                                        tabTitleActiveClassName={cx('border-none', '!text-neutral-700', 'text-2md', 'font-semibold')}
                                        tabTitleListClassName={cx('bg-neutral-100')}
                                        tabTitleListActiveClassName={cx('bg-neutral-white', 'border-b-[1px]', 'border-b-neutral-400')}
                                        tabContentClassName={cx('!pt-0', 'h-full', 'overflow-y-auto', 'overflow-x-hidden')}
                                    />
                                </Drawer>
                            )}
                        </div>
                    ) : null}
                    <div
                        className={cx(
                            'middle-header__logo',
                            'desktop:basis-[272px]',
                            'desktop:h-[44px]',
                            'tablet:flex',
                            'items-center',
                            'cursor-pointer',
                            'mobile:max-tablet:h-[34px]',
                            'mobile:max-tablet:w-[74px]',
                            'mobile:max-tablet:mt-2',
                            'mobile:max-tablet:m-[0_auto]',
                            'mobile:max-tablet:relative',
                        )}
                    >
                        <Link href="/">
                            <Image
                                className="swift-header-middle__logo-link"
                                src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                alt={storeConfig.default_title}
                                {...logoDimensions}
                                {...logoAdditionalProps}
                                storeConfig={storeConfig}
                            />
                        </Link>
                    </div>
                    <div className={cx('middle-header__search', 'mobile:max-tablet:hidden')}>
                        <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} deviceWidth={deviceWidth} />
                    </div>
                    <div className={cx('middle-header__statusicon', 'desktop:grid', 'desktop:grid-cols-[5fr_6fr]')}>
                        <div
                            className={cx('middle-header__statusicon__left-section', 'flex', 'flex-row', 'gap-x-2', 'mobile:max-tablet:justify-end')}
                        >
                            <div className={cx('swift-action-notification', 'mobile:max-tablet:hidden')}>
                                <NotificationBell withLink />
                            </div>
                            {modules.productcompare.enabled && (
                                <div className={cx('swift-action-product-compare', 'mobile:max-desktop:hidden')}>
                                    <ProductCompareIcon withLink isLogin={isLogin} />
                                </div>
                            )}
                            <div className="search-icon tablet:hidden">
                                <Button
                                    className={cx(
                                        'mt-3',
                                        '!px-0',
                                        '!py-0',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={() => setIsSearchShown(!isSearchShown)}
                                    icon={<MagnifyingGlassIcon />}
                                    iconProps={{ className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]') }}
                                    iconOnly
                                    variant="tertiary"
                                    classNameText={cx('!text-neutral-700')}
                                />
                            </div>
                            <div id="header-shoppingBag-icon" className={cx('swift-action-shopping-bag')}>
                                <ShoppingBagIcon withLink storeConfig={storeConfig} />
                            </div>
                        </div>
                        <div className={cx('middle-header__statusicon__right-section relative', 'mobile:max-desktop:hidden')}>
                            <span
                                className={cx(
                                    'border-l-[1.5px]',
                                    'border-l-neutral-200',
                                    'absolute',
                                    'left-0',
                                    'top-[50%]',
                                    'translate-y-[-50%]',
                                    'h-7',
                                )}
                            >
                                &nbsp;
                            </span>
                            <div
                                className={cx(
                                    'middle-header__statusicon__right-section__account',
                                    'pl-2',
                                    'mt-3',
                                    'hover:cursor-pointer',
                                    'flex',
                                    'justify-start',
                                    'group',
                                )}
                            >
                                <UserInfo t={t} isLogin={isLogin} customer={customer} open={open} setOpen={setOpen} PopoverContent={PopoverContent} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('bottom-header', 'tablet:max-w-screen-tablet', 'desktop:max-w-screen-desktop', 'm-[0_auto]', 'px-6')}>
                <div className="flex flex-row menu-category mobile:max-desktop:hidden">
                    <div className="xs:basis-full menu-middle">
                        <nav className="swift-menu-wrapper" role="navigation">
                            {loadingMenu ? <></> : <Menu t={t} data={dataMenu} cmsMenu={cmsMenu} storeConfig={storeConfig} />}
                        </nav>
                    </div>
                </div>
                {isSearchShown && isMobile ? (
                    <div className={cx('bottom-header-mobile__search')}>
                        <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default DesktopHeader;
