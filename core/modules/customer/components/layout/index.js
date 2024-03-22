/* eslint-disable no-plusplus */
import Accordion from '@common/Accordion';
import Backdrop from '@common/Backdrop';
import Typography from '@common_typography';

import { modules } from '@config';
import { getLoginInfo } from '@helper_auth';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = (props) => {
    const {
        children, t, title, activeMenu, storeConfig,
    } = props;
    const pushIf = (condition, ...elements) => (condition ? elements : []);
    const router = useRouter();
    let titlePage = '';

    const isLogin = getLoginInfo();

    const menu = [
        { href: '/customer/account', title: t('customer:menu:myAccount') },
        { title: t('customer:menu:dashboard') },
        ...pushIf(modules.notification.enabled, {
            href: '/inboxnotification/notification',
            title: t('customer:menu:notification'),
        }),
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        ...pushIf(modules.wishlist.enabled, {
            href: '/wishlist',
            title: t('customer:menu:wishlist'),
        }),
        { href: '/sales/downloadable/history', title: t('customer:menu:myDownload') },
        {
            href: storeConfig?.OmsRma?.enable_oms_rma ? storeConfig.OmsRma.oms_rma_link : '/rma/customer',
            title: t('customer:menu:return'),
        },
        ...pushIf(modules.storecredit.enabled, {
            href: '/customer/account/storecredit',
            title: t('customer:menu:storeCredit'),
        }),
        { href: '/customer/account/address', title: t('customer:menu:address') },
        { href: '/customer/account/profile', title: t('customer:menu:accountInformation') },
        ...pushIf(modules.productreview.enabled, {
            href: '/review/customer',
            title: t('customer:menu:myProductReview'),
        }),
        ...pushIf(modules.giftcard.enabled, {
            href: '/awgiftcard/card',
            title: 'Gift Card',
        }),
        ...pushIf(modules.rewardpoint.enabled, {
            href: '/aw_rewardpoints/info',
            title: t('customer:menu:rewardPoint'),
        }),
        { href: '/customer/newsletter', title: t('customer:setting:newsletter') },
    ];
    for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        if (item.href === router.asPath) {
            titlePage = item.title;
        }
    }

    if (!isLogin) {
        return <Backdrop open />;
    }

    return (
        <>
            <div className="desktop:flex desktop:flex-row desktop:gap-x-[18px] mobile:grid mobile:grid-cols-1">
                <div className={cx('desktop:hidden', 'mb-6')}>
                    <Accordion
                        label={<Typography className={cx('!text-lg', 'font-semibold', 'leading-7')}>{title || titlePage}</Typography>}
                        classLabel={cx('p-2')}
                        classSummary={cx('p-3', 'border-[1px]', 'border-neutral-100', 'rounded-lg', 'shadow-sm')}
                    >
                        <div className={cx('w-full', 'px-5', 'border-[2px]', 'border-neutral-100', 'rounded-lg')}>
                            <ul>
                                {menu.map((val, idx) => {
                                    if (idx === 0) {
                                        return null;
                                    }
                                    if (idx === 1) {
                                        return (
                                            <li
                                                key={idx}
                                                className={cx('px-3', 'mt-3', 'pt-2', 'pb-2', 'text-base', 'rounded-md', {
                                                    'bg-neutral-50 border-[1px] border-neutral-100 font-medium':
                                                        router.asPath === '/customer/account' || activeMenu === '/customer/account',
                                                })}
                                            >
                                                <Link href="/customer/account">{val.title}</Link>
                                            </li>
                                        );
                                    }
                                    if (val.title === t('customer:menu:return')) {
                                        return (
                                            <>
                                                <div className={cx('mx-2', 'my-2', 'h-[1px]', 'bg-neutral-200')} />
                                                <li
                                                    key={idx}
                                                    className={cx('px-3', 'py-2', 'text-base', 'rounded-md', {
                                                        'bg-neutral-50 border-[1px] border-neutral-100 font-medium':
                                                            router.asPath === val.href || activeMenu === val.href,
                                                    })}
                                                >
                                                    <Link href={val.href}>{val.title}</Link>
                                                </li>
                                            </>
                                        );
                                    }
                                    if (modules.productreview.enabled && val.title === t('customer:menu:myProductReview')) {
                                        return (
                                            <>
                                                <div className={cx('mx-2', 'my-2', 'h-[1px]', 'bg-neutral-200')} />
                                                <li
                                                    key={idx}
                                                    className={cx('px-3', 'py-2', 'text-base', 'rounded-md', {
                                                        'bg-neutral-50 border-[1px] border-neutral-100 font-medium':
                                                            router.asPath === val.href || activeMenu === val.href,
                                                    })}
                                                >
                                                    <Link href={val.href}>{val.title}</Link>
                                                </li>
                                            </>
                                        );
                                    }
                                    return (
                                        <li
                                            key={idx}
                                            className={cx('px-3', 'py-2', 'text-base', 'rounded-md', {
                                                'bg-neutral-50 border-[1px] border-neutral-100 font-medium':
                                                    router.asPath === val.href || activeMenu === val.href,
                                            })}
                                        >
                                            <Link href={val.href}>{val.title}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </Accordion>
                </div>
                <div className={cx('desktop:basis-3/12', 'xs:basis-full', 'mobile:max-desktop:hidden')}>
                    <div className={cx('p-3', 'rounded-lg', 'border-[1px]', 'border-neutral-200', 'shadow-sm')}>
                        <ul>
                            {menu.map((val, idx) => {
                                if (idx === 0) {
                                    return (
                                        <li
                                            key={idx}
                                            className={cx(
                                                'mx-3',
                                                'pt-3',
                                                'pb-5',
                                                'text-[18px]',
                                                'font-semibold',
                                                'leading-7',
                                                'border-b-[1px]',
                                                'border-neutral-200',
                                            )}
                                        >
                                            {val.title}
                                        </li>
                                    );
                                }
                                if (idx === 1) {
                                    return (
                                        <li
                                            key={idx}
                                            className={cx('px-3', 'mt-3', 'pt-2', 'pb-2', 'text-base', 'rounded-md', {
                                                'bg-neutral-50 border-[1px] border-neutral-100 font-medium':
                                                    router.asPath === '/customer/account' || activeMenu === '/customer/account',
                                            })}
                                        >
                                            <Link href="/customer/account">{val.title}</Link>
                                        </li>
                                    );
                                }
                                if (val.title === t('customer:menu:return')) {
                                    return (
                                        <>
                                            <div className={cx('mx-2', 'my-2', 'h-[1px]', 'bg-neutral-200')} />
                                            <li
                                                key={idx}
                                                className={cx('px-3', 'py-2', 'text-base', 'rounded-md', {
                                                    'bg-neutral-50 border-[1px] border-neutral-100 font-medium':
                                                        router.asPath === val.href || activeMenu === val.href,
                                                })}
                                            >
                                                <Link href={val.href}>{val.title}</Link>
                                            </li>
                                        </>
                                    );
                                }
                                if (modules.productreview.enabled && val.title === t('customer:menu:myProductReview')) {
                                    return (
                                        <>
                                            <div className={cx('mx-2', 'my-2', 'h-[1px]', 'bg-neutral-200')} />
                                            <li
                                                key={idx}
                                                className={cx('px-3', 'py-2', 'text-base', 'rounded-md', {
                                                    'bg-neutral-50 border-[1px] border-neutral-100 font-medium':
                                                        router.asPath === val.href || activeMenu === val.href,
                                                })}
                                            >
                                                <Link href={val.href}>{val.title}</Link>
                                            </li>
                                        </>
                                    );
                                }
                                return (
                                    <li
                                        key={idx}
                                        className={cx('px-3', 'py-2', 'text-base', 'rounded-md', {
                                            'bg-neutral-50 border-[1px] border-neutral-100 font-medium':
                                                router.asPath === val.href || activeMenu === val.href,
                                        })}
                                    >
                                        <Link href={val.href}>{val.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="desktop:basis-9/12 xs:basis-full sm:basis-full">
                    <Typography variant="h2" type="bold" letter="capitalize" className={cx('mobile:max-desktop:hidden', 'pl-0', 'mb-[20px]')}>
                        {title || titlePage}
                    </Typography>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
