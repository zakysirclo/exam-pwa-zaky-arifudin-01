/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import { currencyVar } from '@core/services/graphql/cache';
import Cookies from 'js-cookie';
import cx from 'classnames';
import Badge from '@common_badge';
import Button from '@common_button';
import Typography from '@common_typography';
import MobileTabletActionMenu from '@core_modules/customer/pages/account/components/Customer/view/components/plugins/MobileTabletActionMenu';
import ArrowDownIcon from '@heroicons/react/20/solid/ArrowDownIcon';
import Alert from '@common_alert';
import Show from '@common_show';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import useMediaQuery from '@hook/useMediaQuery';

const OrderView = (props) => {
    const {
        customerOrders, t, reOrder, returnUrl,
    } = props;
    const { isMobile } = useMediaQuery();

    // cache currency
    const currencyCache = currencyVar();
    const currencyData = Cookies.get('app_currency') && JSON.parse(Cookies.get('app_currency'));
    const hasData = customerOrders?.items?.length;

    const generateBadge = (status, status_label) => {
        if (status === 'processing' || status === 'pending' || status === 'payment_review') {
            return (
                <Badge
                    softColor
                    warning
                    className={cx('rounded-md', 'w-fit', 'mobile:!py-[2px] tablet:!py-[4px]')}
                    label={<Typography className={cx('text-yellow-800', 'leading-md')}>{status_label}</Typography>}
                />
            );
        }
        if (status === 'canceled') {
            return (
                <Badge
                    softColor
                    error
                    className={cx('rounded-md', 'w-fit', 'mobile:!py-[2px] tablet:!py-[4px]')}
                    label={<Typography className={cx('text-red-800', 'leading-md')}>{status_label}</Typography>}
                />
            );
        }
        if (status === 'complete') {
            return (
                <Badge
                    softColor
                    success
                    className={cx('rounded-md', 'w-fit', 'mobile:!py-[2px] tablet:!py-[4px]')}
                    label={<Typography className={cx('text-green-800', 'leading-md')}>{status_label}</Typography>}
                />
            );
        }
        return (
            <Badge
                softColor
                secondary
                className={cx('rounded-md', 'w-fit', 'mobile:!py-[2px] tablet:!py-[4px]')}
                label={<Typography className={cx('text-primary-800', 'leading-md')}>{status_label}</Typography>}
            />
        );
    };

    return (
        <div className={cx('pt-10', '')}>
            <div
                className={cx(
                    'address-title-section',
                    'pb-[18px]',
                    'border-b-[1.5px]',
                    'border-neutral-200',
                    'flex',
                    'flex-row',
                    'justify-between',
                    'items-center',
                )}
            >
                <Typography variant="h3" className={cx('pl-0')}>
                    {t('customer:order:recentOrder')}
                </Typography>
                <Button link="/sales/order/history" variant="plain" className={cx('swift-viewallorder', 'pl-6', 'pr-0', '!py-0')}>
                    <Typography variant="bd-2a" className={cx('!text-neutral-500', 'underline', 'underline-offset-2')}>
                        {t('customer:menu:viewall')}
                    </Typography>
                </Button>
            </div>
            <div className={cx('pt-[18px]')}>
                {/** Tablet View */}
                <Show when={!isMobile}>
                    <div className={cx('tablet-view', 'relative', 'overflow-x-auto', 'rounded-lg')}>
                        <table className={cx('w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                            <thead>
                                <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                    <th className={cx('px-4', 'py-3')}>
                                        {t('customer:order:order')} # <ArrowDownIcon className={cx('inline-block', 'w-5', 'h-5')} />
                                    </th>
                                    <th className={cx('px-4', 'py-3')}>
                                        {t('customer:order:date')} <ArrowDownIcon className={cx('inline-block', 'w-5', 'h-5')} />
                                    </th>
                                    <th className={cx('px-4', 'py-3')}>{t('customer:order:shippedTo')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('customer:order:orderTotal')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('customer:order:status')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('customer:order:action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Show when={hasData}>
                                    <>
                                        {customerOrders?.items?.map((val, index) => (
                                            <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                                    {val.order_number}
                                                </td>
                                                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                                    {formatDate(val.created_at, 'DD/MM/YYYY')}
                                                </td>
                                                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                                    {val.detail[0].shipping_address.firstname || val.detail[0].billing_address.firstname}{' '}
                                                    {val.detail[0].shipping_address.lastname || val.detail[0].billing_address.lastname}
                                                </td>
                                                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                                    {formatPrice(
                                                        val.grand_total,
                                                        val.detail[0].global_currency_code
                                                            ? val.detail[0].global_currency_code
                                                            : currencyData.default_display_currency_code,
                                                        currencyCache,
                                                    )}
                                                </td>
                                                <td>{generateBadge(val.status, val.status_label)}</td>
                                                <td
                                                    className={cx(
                                                        'tablet:max-desktop:flex',
                                                        'tablet:max-desktop:flex-row',
                                                        'tablet:max-desktop:content-center',
                                                        'tablet:max-desktop:justify-center',
                                                        'tablet:max-desktop:items-center',
                                                        'tablet:max-desktop:py-6',
                                                    )}
                                                >
                                                    <MobileTabletActionMenu
                                                        t={t}
                                                        orderNumber={val.order_number}
                                                        reOrder={reOrder}
                                                        return={val.detail[0].aw_rma && val.detail[0].aw_rma.status}
                                                        handlingReturn={() => returnUrl(val.order_number)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                </Show>
                                <Show when={!hasData}>
                                    <tr>
                                        <td colSpan={6}>
                                            <Alert severity="warning" withIcon>
                                                {t('customer:order:emptyMessage')}
                                            </Alert>
                                        </td>
                                    </tr>
                                </Show>
                            </tbody>
                        </table>
                    </div>
                </Show>
                {/** Mobile View */}
                <Show when={isMobile}>
                    <div className={cx('swift-mobile-view')}>
                        <Show when={hasData}>
                            <>
                                {customerOrders?.items?.map((val, index) => (
                                    <div
                                        key={`mobile-order-item-${index}`}
                                        className={cx(
                                            'swift-mobile-order-item',
                                            'flex',
                                            'flex-col',
                                            'border-[1px] border-neutral-200',
                                            'rounded-[6px]',
                                            'px-[24px]',
                                            'py-[20px]',
                                            'mobile:!mb-[16px] tablet:!mb-[24px]',
                                        )}
                                    >
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            {generateBadge(val.status, val.status_label)}
                                            <div>
                                                <MobileTabletActionMenu
                                                    return={val.detail[0].aw_rma && val.detail[0].aw_rma.status}
                                                    handlingReturn={() => returnUrl(val.order_number)}
                                                    t={t}
                                                    orderNumber={val.order_number}
                                                    reOrder={reOrder}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('mt-[8px]')}>
                                            <Typography variant="bd-2b" className={cx('font-semibold')}>
                                                #{val.order_number}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="bd-2b" className={cx('text-sm', 'text-neutral-500')}>
                                                {formatDate(val.created_at, 'DD/MM/YYYY')}
                                            </Typography>
                                        </div>
                                        <div className={cx('divider', 'border-b-[1px] border-neutral-200', 'my-[12px]')} />
                                        <div
                                            className={cx(
                                                'flex',
                                                'justify-between',
                                                'mobile:flex-col',
                                                'mobile:items-start',
                                                'mobile:gap-[6px]',
                                                // 'tablet:flex-row',
                                                // 'tablet:items-center',
                                                // 'tablet:gap-[6px]',
                                            )}
                                        >
                                            <div className={cx('flex', 'flex-row', 'text-primary', 'items-center')}>
                                                <div className={cx('w-[20px] h-[20px] mr-[8px]')}>
                                                    <TruckIcon />
                                                </div>
                                                <Typography variant="bd-2b" className={cx('!text-neutral-500')}>
                                                    {t('order:shipTo')}{' '}
                                                    {val.detail[0].shipping_address.firstname || val.detail[0].billing_address.firstname}{' '}
                                                    {val.detail[0].shipping_address.lastname || val.detail[0].billing_address.lastname}
                                                </Typography>
                                            </div>
                                            <div className={cx('flex', 'flex-col')}>
                                                <div>
                                                    <Typography variant="bd-2b" className={cx('text-xs', '!text-neutral-500', '!leading-none')}>
                                                        {t('customer:order:orderTotal')}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography>
                                                        {formatPrice(
                                                            val.grand_total,
                                                            val.detail[0].global_currency_code
                                                                ? val.detail[0].global_currency_code
                                                                : currencyData.default_display_currency_code,
                                                            currencyCache,
                                                        )}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        </Show>
                        <Show when={!hasData}>
                            <Alert severity="warning" withIcon>
                                {t('customer:order:emptyMessage')}
                            </Alert>
                        </Show>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default OrderView;
