import Typography from '@common_typography';
import Router from 'next/router';
import Layout from '@layout_customer';
import Alert from '@common_alert';
import Pagination from '@common_pagination';
import Select from '@common_forms/Select';
import Show from '@common_show';
import cx from 'classnames';
import { SkeletonDesktop, SkeletonMobile } from '@core_modules/rma/pages/history/components/Skeleton';
import MobileTabletActionMenu from '@core_modules/rma/pages/history/components/plugins/MobileTabletActionMenu';
import Link from 'next/link';
import useMediaQuery from '@hook/useMediaQuery';

const MobileTableItemComponent = ({ label, value, CustomComponentValue }) => (
    <div className={cx('flex flex-row')}>
        <div className={cx('mobile:w-[30%] tablet:w-[35%]')}>
            <Typography variant="bd-2b" className={cx('!font-semibold')}>
                {label}
            </Typography>
        </div>
        <div className="w-[5%]">
            <Typography variant="bd-2b">{' : '}</Typography>
        </div>
        <div className={cx('mobile:w-[65%] tablet:w-[60%]')}>
            <Show when={!!CustomComponentValue}>{CustomComponentValue}</Show>
            <Show when={!CustomComponentValue}>
                <Typography variant="bd-2b">{value}</Typography>
            </Show>
        </div>
    </div>
);

const HistoryContent = (props) => {
    const {
        t, data, loading, error, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
    } = props;
    const { isDesktop } = useMediaQuery();
    const hasData = data?.getCustomerRequestAwRma?.items && data?.getCustomerRequestAwRma?.items?.length > 0;
    const totalPages = data?.getCustomerRequestAwRma?.total_pages;
    const totalCount = data?.getCustomerRequestAwRma?.total_count ?? 0;

    const PaginationComponent = () => (
        <div className={cx('table-data pt-6 flex justify-between', 'tablet:items-center tablet:flex-row', 'mobile:flex-col')}>
            <div className="flex justify-between items-center flex-1">
                <Typography className={cx('font-normal', 'leading-2lg')}>{`${totalCount ?? 0} ${t('common:label:data')}`}</Typography>
                <div className="flex items-center">
                    <Typography className={cx('font-normal', 'leading-2lg', 'p-3')}>{t('common:label:show')}</Typography>
                    <Select
                        name="show"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
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
                                value: totalCount,
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
                    page={page}
                    siblingCount={0}
                    className={cx('!p-0')}
                    totalPage={totalPages}
                />
            </div>
        </div>
    );

    return (
        <Layout {...props}>
            <div className={cx('rma-container')}>
                {/** Desktop */}
                <Show when={isDesktop}>
                    <div className={cx('desktop-view')}>
                        <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                            <table className={cx('swift-table-rma-history', 'w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                                <thead>
                                    <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                        <th className={cx('px-4', 'py-3')}>{t('rma:table:returnId')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('rma:table:orderId')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('rma:table:products')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('rma:table:status')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('common:label:action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Show when={loading}>
                                        <SkeletonDesktop />
                                    </Show>
                                    <Show when={!loading}>
                                        <Show when={error}>
                                            <td colSpan={5}>
                                                <Alert severity="error" withIcon>
                                                    {error?.message ?? t('common:error:fetchError')}
                                                </Alert>
                                            </td>
                                        </Show>

                                        <Show when={!error}>
                                            <Show when={hasData}>
                                                <>
                                                    {data?.getCustomerRequestAwRma?.items?.map((val, index) => (
                                                        <tr className={cx('swift-table-row', 'even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{val.increment_id}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Link
                                                                    href={`/sales/order/view/order_id/${val.order_number}`}
                                                                    className={cx('swift-action-vieworder', 'hover:underline')}
                                                                >
                                                                    <Typography
                                                                        variant="bd-2b"
                                                                        className={cx('!text-primary-700', 'hover:underline')}
                                                                    >
                                                                        {val.order_number}
                                                                    </Typography>
                                                                </Link>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">
                                                                    {val.items.map((item, idx) => `${item.name}${idx > 0 ? ', ' : ''}`)}
                                                                </Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{val.status.name}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        Router.push(
                                                                            '/rma/customer/view/id/[id]',
                                                                            `/rma/customer/view/id/${val.increment_id}`,
                                                                        )}
                                                                    aria-label="view-detail"
                                                                    className="swift-action-viewrma w-max"
                                                                >
                                                                    <a>
                                                                        <Typography
                                                                            variant="bd-2b"
                                                                            className={cx('!text-primary-700', 'hover:underline')}
                                                                        >
                                                                            {t('rma:table:view')}
                                                                        </Typography>
                                                                    </a>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            </Show>

                                            <Show when={!hasData}>
                                                <td colSpan={5}>
                                                    <Alert severity="warning" withIcon>
                                                        {t('rma:empty')}
                                                    </Alert>
                                                </td>
                                            </Show>
                                        </Show>
                                    </Show>
                                </tbody>
                            </table>
                        </div>
                        {/** show pagination */}
                        <Show when={hasData && !loading}>
                            <PaginationComponent />
                        </Show>
                    </div>
                </Show>

                {/** Mobile Tablet */}
                <Show when={!isDesktop}>
                    <div className={cx('mobile-tablet-view')}>
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
                                        {data?.getCustomerRequestAwRma?.items?.map((val, index) => (
                                            <div
                                                key={`mobile-item-${index}`}
                                                className={cx(
                                                    'mobile-item',
                                                    'flex',
                                                    'flex-col',
                                                    'border-[1px] border-neutral-200',
                                                    'rounded-[6px]',
                                                    'px-[24px]',
                                                    'py-[20px]',
                                                    'mobile:!mb-[16px] tablet:!mb-[24px]',
                                                )}
                                            >
                                                <div className={cx('flex', 'justify-end')}>
                                                    <MobileTabletActionMenu
                                                        t={t}
                                                        openDetail={() =>
                                                            Router.push('/rma/customer/view/id/[id]', `/rma/customer/view/id/${val.increment_id}`)}
                                                    />
                                                </div>
                                                <MobileTableItemComponent label={t('rma:table:returnId')} value={val.increment_id} />
                                                <MobileTableItemComponent
                                                    label={t('rma:table:orderId')}
                                                    CustomComponentValue={(
                                                        <Link
                                                            href={`/sales/order/view/order_id/${val.order_number}`}
                                                            className={cx('hover:underline')}
                                                        >
                                                            <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                                                {val.order_number}
                                                            </Typography>
                                                        </Link>
                                                    )}
                                                />
                                                <MobileTableItemComponent
                                                    label={t('rma:table:products')}
                                                    value={val.items.map((item, idx) => `${item.name}${idx > 0 ? ', ' : ''}`)}
                                                />
                                                <MobileTableItemComponent label={t('rma:table:status')} value={val.status.name} />
                                            </div>
                                        ))}
                                        <PaginationComponent />
                                    </>
                                </Show>
                                <Show when={!hasData}>
                                    <Alert severity="warning" withIcon>
                                        {t('rma:empty')}
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

export default HistoryContent;
