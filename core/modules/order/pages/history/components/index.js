/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import Link from 'next/link';
import { currencyVar } from '@core/services/graphql/cache';
import cx from 'classnames';
import Layout from '@layout_customer';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import Badge from '@common_badge';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Typography from '@common_typography';
import MobileTabletActionMenu from '@core_modules/order/pages/history/components/plugins/MobileTabletActionMenu';
import Alert from '@common_alert';
import Show from '@common_show';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import { SkeletonDesktop, SkeletonMobile } from '@core_modules/order/pages/history/components/skeleton';
import useMediaQuery from '@hook/useMediaQuery';

const DefaultView = (props) => {
    const {
        data, loading, t, storeConfig, reOrder, pageSize, handleChangePage, handleChangePageSize, error, returnUrl,
    } = props;
    const { isDesktop } = useMediaQuery();
    // cache currency
    const currencyCache = currencyVar();
    const hasData = data?.items?.length;

    const generateBadge = (status, status_label) => {
        if (status === 'processing' || status === 'pending' || status === 'payment_review') {
            return (
                <Badge
                    softColor
                    warning
                    className={cx('rounded-md', 'w-fit', 'mobile:!py-[2px] tablet:!py-[2px]')}
                    label={
                        <Typography className={cx('text-yellow-800', 'leading-md', 'mobile:text-sm', 'desktop:text-base')}>{status_label}</Typography>
                    }
                />
            );
        }
        if (status === 'canceled') {
            return (
                <Badge
                    softColor
                    error
                    className={cx('rounded-md', 'w-fit', 'mobile:!py-[2px] tablet:!py-[2px]')}
                    label={
                        <Typography className={cx('text-red-800', 'leading-md', 'mobile:text-sm', 'desktop:text-base')}>{status_label}</Typography>
                    }
                />
            );
        }
        if (status === 'complete') {
            return (
                <Badge
                    softColor
                    success
                    className={cx('rounded-md', 'w-fit', 'mobile:!py-[2px] tablet:!py-[2px]')}
                    label={
                        <Typography className={cx('text-green-800', 'leading-md', 'mobile:text-sm', 'desktop:text-base')}>{status_label}</Typography>
                    }
                />
            );
        }
        return (
            <Badge
                softColor
                secondary
                className={cx('rounded-md', 'w-fit')}
                label={<Typography className={cx('text-primary-800', 'leading-md')}>{status_label}</Typography>}
            />
        );
    };

    const PaginationComponent = () => (
        <div className={cx('table-data pt-6 flex justify-between', 'tablet:items-center tablet:flex-row', 'mobile:flex-col')}>
            <div className="flex justify-between items-center flex-1">
                <Typography className={cx('font-normal', 'leading-2lg')}>{`${data?.total_count ?? 0} ${t('common:label:data')}`}</Typography>
                <div className="flex items-center">
                    <Typography className={cx('font-normal', 'leading-2lg', 'p-3')}>{t('common:label:show')}</Typography>
                    <Select
                        name="show"
                        value={pageSize}
                        onChange={handleChangePageSize}
                        options={[
                            {
                                label: 10,
                                value: 10,
                            },
                            {
                                label: 20,
                                value: 20,
                            },
                            {
                                label: 50,
                                value: 50,
                            },
                            {
                                label: t('common:label:all'),
                                value: data?.total_count,
                            },
                        ]}
                        textFiledProps={{ className: cx('w-[80px]') }}
                        inputProps={{ className: cx('!py-0') }}
                    />
                </div>
            </div>
            <div className={cx('flex', 'flex-row', 'items-center', 'mobile:max-tablet:pt-4', 'mobile:max-tablet:justify-center')}>
                <Pagination
                    clickToTop
                    handleChangePage={handleChangePage}
                    page={data?.current_page}
                    siblingCount={0}
                    className={cx('!p-0')}
                    totalPage={data?.total_pages}
                />
            </div>
        </div>
    );

    return (
        <Layout t={t}>
            <div>
                {/** Desktop */}
                <Show when={isDesktop}>
                    <div className={cx('desktop-view')}>
                        <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                            <table className={cx('swift-table-order-history', 'w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                                <thead>
                                    <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:order:order')} #</th>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:order:date')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:order:shippedTo')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:order:orderTotal')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:order:status')}</th>
                                        <th className={cx('px-4', 'py-3', 'text-center')}>{t('customer:order:action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Show when={loading}>
                                        <SkeletonDesktop />
                                    </Show>

                                    <Show when={!loading}>
                                        <Show when={error}>
                                            <tr>
                                                <td colSpan={6}>
                                                    <Alert severity="error" withIcon>
                                                        {error?.message ?? t('common:error:fetchError')}
                                                    </Alert>
                                                </td>
                                            </tr>
                                        </Show>

                                        <Show when={!error}>
                                            <Show when={hasData}>
                                                <>
                                                    {data?.items?.map((val, index) => (
                                                        <tr className={cx('swift-table-row', 'even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{val.order_number}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{formatDate(val.created_at, 'DD/MM/YYYY')}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">
                                                                    {val.detail[0].shipping_address.firstname
                                                                        || val.detail[0].billing_address.firstname}{' '}
                                                                    {val.detail[0].shipping_address.lastname
                                                                        || val.detail[0].billing_address.lastname}
                                                                </Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">
                                                                    {formatPrice(
                                                                        val.grand_total,
                                                                        storeConfig.base_currency_code || 'IDR',
                                                                        currencyCache,
                                                                    )}
                                                                </Typography>
                                                            </td>
                                                            <td>{generateBadge(val.status, val.status_label)}</td>
                                                            <td>
                                                                <div className={cx('mobile:max-desktop:hidden')}>
                                                                    <Link
                                                                        href={`/sales/order/view/order_id/${val.order_number}`}
                                                                        className={cx('swift-orderactionview', 'px-4')}
                                                                    >
                                                                        <Typography
                                                                            variant="bd-2b"
                                                                            className={cx('!text-primary-700', 'hover:underline')}
                                                                        >
                                                                            {t('order:view')}
                                                                        </Typography>
                                                                    </Link>
                                                                    <button type="button" onClick={() => reOrder(val.order_number)}>
                                                                        <a
                                                                            className={cx(
                                                                                'swift-orderactionreorder',
                                                                                'px-4',
                                                                                'desktop:border-l-[1px]',
                                                                                'desktop:border-neutral-200',
                                                                            )}
                                                                        >
                                                                            <Typography
                                                                                variant="bd-2b"
                                                                                className={cx('!text-primary-700', 'hover:underline')}
                                                                            >
                                                                                {t('order:reorder')}
                                                                            </Typography>
                                                                        </a>
                                                                    </button>
                                                                    {val.detail[0].aw_rma && val.detail[0].aw_rma.status && (
                                                                        <button type="button" onClick={() => returnUrl(val.order_number)}>
                                                                            <a
                                                                                className={cx(
                                                                                    'swift-orderactionreturn',
                                                                                    'px-4',
                                                                                    'desktop:border-l-[1px]',
                                                                                    'desktop:border-neutral-200',
                                                                                )}
                                                                            >
                                                                                <Typography
                                                                                    variant="bd-2b"
                                                                                    className={cx('!text-primary-700', 'hover:underline')}
                                                                                >
                                                                                    {t('order:smReturn')}
                                                                                </Typography>
                                                                            </a>
                                                                        </button>
                                                                    )}
                                                                </div>
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
                                        </Show>
                                    </Show>
                                </tbody>
                            </table>
                        </div>
                        {/** show pagination */}
                        <Show when={hasData}>
                            <PaginationComponent />
                        </Show>
                    </div>
                </Show>

                {/** Mobile & Tablet */}
                <Show when={!isDesktop}>
                    <div className={cx('swift-mobile-tablet-view')}>
                        <Show when={loading}>
                            <SkeletonMobile />
                        </Show>

                        <Show when={!loading}>
                            <Show when={error}>
                                <Alert severity="error" withIcon>
                                    {error?.message ?? t('common:error:fetchError')}
                                </Alert>
                            </Show>

                            <Show when={!error}>
                                <Show when={hasData}>
                                    <>
                                        {data?.items?.map((val, index) => (
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
                                                        'tablet:flex-row',
                                                        'tablet:items-center',
                                                        'tablet:gap-[6px]',
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
                                                            <Typography
                                                                variant="bd-2b"
                                                                className={cx('text-xs', '!text-neutral-500', '!leading-none')}
                                                            >
                                                                {t('customer:order:orderTotal')}
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography>
                                                                {formatPrice(val.grand_total, storeConfig.base_currency_code || 'IDR', currencyCache)}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <PaginationComponent />
                                    </>
                                </Show>
                                <Show when={!hasData}>
                                    <Alert severity="warning" withIcon>
                                        {t('customer:order:emptyMessage')}
                                    </Alert>
                                </Show>
                            </Show>
                        </Show>
                    </div>
                </Show>
            </div>
        </Layout>
    );
};

export default DefaultView;
