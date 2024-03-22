import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import cx from 'classnames';
import Typography from '@common_typography';
import Show from '@common_show';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Skeleton from '@common_skeleton';
import { SkeletonDesktop, SkeletonMobile } from '@core_modules/storecredit/pages/default/components/skeleton';
import Alert from '@common_alert';
import useMediaQuery from '@hook/useMediaQuery';

const MobileTableItemComponent = ({ label, value, CustomComponentValue }) => (
    <div className={cx('flex flex-row')}>
        <div className={cx('mobile:w-[40%] tablet:w-[45%]')}>
            <Typography variant="bd-2b" className={cx('!font-semibold')}>
                {label}
            </Typography>
        </div>
        <div className="w-[5%]">
            <Typography variant="bd-2b">{' : '}</Typography>
        </div>
        <div className={cx('mobile:w-[55%] tablet:w-[50%]')}>
            <Show when={!!CustomComponentValue}>{CustomComponentValue}</Show>
            <Show when={!CustomComponentValue}>
                <Typography variant="bd-2b">{value}</Typography>
            </Show>
        </div>
    </div>
);

const StoreCreditPage = (props) => {
    const {
        t, storeCredit, loading, error, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, currencyCache,
    } = props;
    const { isDesktop } = useMediaQuery();
    const hasData = storeCredit?.transaction_history?.items && storeCredit?.transaction_history?.items?.length > 0;
    const pageInfo = storeCredit?.transaction_history?.page_info;
    const totalCount = storeCredit?.transaction_history?.total_count ?? 0;

    const StoreCreditBalanceComponent = () => (
        <div className={cx('storecredit-balance-wrapper', 'flex', 'items-center')}>
            <div>
                <Typography variant="bd-2b">
                    {t('storecredit:balance')}
                    {' '}
                    <Show when={!loading}>
                        <b>{formatPrice(storeCredit?.current_balance?.value ?? 0, storeCredit?.current_balance?.currency ?? 'IDR', currencyCache)}</b>
                    </Show>
                </Typography>
            </div>
            <Show when={loading}>
                <Skeleton width={50} height={15} className={cx('ml-[5px]')} />
            </Show>
        </div>
    );

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
                    totalPage={pageInfo?.total_pages}
                />
            </div>
        </div>
    );

    return (
        <Layout {...props}>
            <div className={cx('storecredit-container')}>
                {/** Desktop */}
                <Show when={isDesktop}>
                    <div className={cx('desktop-view')}>
                        <StoreCreditBalanceComponent />
                        <div className={cx('relative', 'overflow-x-auto', 'rounded-lg', 'pt-5')}>
                            <table className={cx('swift-table-storecredit-history', 'w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                                <thead>
                                    <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                        <th className={cx('px-4', 'py-3')}>
                                            {t('storecredit:transactionId')}
                                            {' '}
                                            #
                                        </th>
                                        <th className={cx('px-4', 'py-3')}>{t('storecredit:adjustment')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('storecredit:creditbalance')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('storecredit:comment')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('storecredit:transactionDate')}</th>
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
                                                    {storeCredit?.transaction_history?.items.map((val, index) => (
                                                        <tr
                                                            className={cx(
                                                                'swift-table-row',
                                                                'even:bg-white',
                                                                'odd:bg-neutral-50',
                                                            )}
                                                            key={index}
                                                        >
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{val.transaction_id}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography
                                                                    variant="bd-2b"
                                                                    className={cx(
                                                                        val?.store_credit_adjustment?.value < 0 ? '!text-red-500' : '!text-green-500',
                                                                    )}
                                                                >
                                                                    {formatPrice(
                                                                        val.store_credit_adjustment.value,
                                                                        val.store_credit_adjustment.currency,
                                                                        currencyCache,
                                                                    )}
                                                                </Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">
                                                                    {formatPrice(
                                                                        val.store_credit_balance.value,
                                                                        val.store_credit_balance.currency,
                                                                        currencyCache,
                                                                    )}
                                                                </Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{val.comment}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{formatDate(val.created_at, 'DD/MM/YYYY')}</Typography>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            </Show>
                                            <Show when={!hasData}>
                                                <td colSpan={5}>
                                                    <Alert severity="warning" withIcon>
                                                        {t('storecredit:emptyMessage')}
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
                    <div className={cx('swift-mobile-tablet-view')}>
                        <StoreCreditBalanceComponent />

                        <div className={cx('divider', 'border-b-[1.5px] border-neutral-200', 'mt-[16px]', 'mobile:!mb-[20px] tablet:mb-[24px]')} />

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
                                        {storeCredit?.transaction_history?.items.map((val, index) => (
                                            <div
                                                key={`mobile-item-${index}`}
                                                className={cx(
                                                    'swift-mobile-item',
                                                    'flex',
                                                    'flex-col',
                                                    'border-[1px] border-neutral-200',
                                                    'rounded-[6px]',
                                                    'px-[24px]',
                                                    'py-[20px]',
                                                    'mobile:!mb-[16px] tablet:!mb-[24px]',
                                                )}
                                            >
                                                <MobileTableItemComponent label={t('storecredit:transactionId')} value={val.transaction_id} />
                                                <MobileTableItemComponent
                                                    label={t('storecredit:adjustment')}
                                                    CustomComponentValue={(
                                                        <Typography
                                                            variant="bd-2b"
                                                            className={cx(
                                                                val?.store_credit_adjustment?.value < 0 ? '!text-red-500' : '!text-green-500',
                                                            )}
                                                        >
                                                            {formatPrice(
                                                                val.store_credit_adjustment.value,
                                                                val.store_credit_adjustment.currency,
                                                                currencyCache,
                                                            )}
                                                        </Typography>
                                                    )}
                                                />
                                                <MobileTableItemComponent
                                                    label={t('storecredit:creditbalance')}
                                                    value={formatPrice(
                                                        val.store_credit_balance.value,
                                                        val.store_credit_balance.currency,
                                                        currencyCache,
                                                    )}
                                                />
                                                <MobileTableItemComponent label={t('storecredit:comment')} value={val.comment} />
                                                <MobileTableItemComponent
                                                    label={t('storecredit:transactionDate')}
                                                    value={formatDate(val.created_at, 'DD/MM/YYYY')}
                                                />
                                            </div>
                                        ))}
                                        <PaginationComponent />
                                    </>
                                </Show>
                                <Show when={!hasData}>
                                    <Alert severity="warning" withIcon>
                                        {t('storecredit:emptyMessage')}
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

export default StoreCreditPage;
