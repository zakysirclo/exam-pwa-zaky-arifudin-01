/* eslint-disable react/no-danger */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */

import Link from 'next/link';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import cx from 'classnames';
import Typography from '@common_typography';
import Show from '@common_show';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Skeleton from '@common_skeleton';
import { SkeletonDesktop, SkeletonMobile } from '@core_modules/rewardpoint/pages/default/components/skeleton';
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

const RewardPointView = (props) => {
    const {
 data, t, loading, error, getPath, getId, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, currencyCache,
} = props;
    const { isDesktop } = useMediaQuery();
    const hasData = data?.transaction_history?.items && data?.transaction_history?.items?.length > 0;
    const pageInfo = data?.transaction_history?.page_info;
    const totalCount = data?.transaction_history?.total_count ?? 0;

    const formatPoint = (value) => {
        const price = formatPrice(value ?? 0, 'IDR', currencyCache);
        const priceSplit = price.replace(/\u00A0/, ' ').split(' ');
        const pointFormat = priceSplit[priceSplit.length - 1];

        if (price.includes('-')) {
            return `-${pointFormat}`;
        }

        return pointFormat;
    };

    const RewardPointInfoComponent = () => (
        <>
            <div className={cx('rewardpoint-balance-wrapper', 'flex', 'items-center')}>
                <div>
                    <Typography variant="bd-2b">
                        {t('rewardpoint:balanceTitle')}
                        {' '}
                        <Show when={!loading}>
                            <b>{formatPoint(data.balance)}</b>
                        </Show>
                    </Typography>
                </div>
                <Show when={loading}>
                    <Skeleton width={50} height={15} className={cx('ml-[5px]', 'mt-[2px]')} />
                </Show>
            </div>
            <div className={cx('rewardpoint-canbe-wrapper', 'flex', 'items-center')}>
                <div>
                    <Typography variant="bd-2b">
                        {t('rewardpoint:canbeTitle')}
                        {' '}
                        <Show when={!loading}>
                            <b>{formatPrice(data.balanceCurrency ?? 0, 'IDR', currencyCache)}</b>
                        </Show>
                    </Typography>
                </div>
                <Show when={loading}>
                    <Skeleton width={50} height={15} className={cx('ml-[5px]', 'mt-[2px]')} />
                </Show>
            </div>
            <div className={cx('rewardpoint-learn-more', 'flex', 'items-center')}>
                <div>
                    <Typography variant="bd-2b">
                        {t('rewardpoint:learnMore').split('$')[0]}
                        <Link href="/[...slug]" as="/aw-reward-points" legacyBehavior>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cx(
                                    'swift-action-learnmore',
                                    'text-primary-700',
                                    'hover:underline',
                                )}
                            >
                                {t('rewardpoint:learnMore').split('$')[1]}
                            </a>
                        </Link>
                    </Typography>
                </div>
            </div>
        </>
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
            <div className={cx('rewardpoint-container')}>
                {/** Desktop */}
                <Show when={isDesktop}>
                    <div className={cx('desktop-view')}>
                        <RewardPointInfoComponent />
                        <div className={cx('relative', 'overflow-x-auto', 'rounded-lg', 'pt-5')}>
                            <table className={cx('swift-table-rewardpoints', 'w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                                <thead>
                                    <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                        <th className={cx('px-4', 'py-3')}>
                                            {t('rewardpoint:transactionId')}
                                            {' '}
                                            #
                                        </th>
                                        <th className={cx('px-4', 'py-3')}>{t('rewardpoint:balance')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('rewardpoint:comment')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('rewardpoint:expired')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('rewardpoint:point')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('rewardpoint:transactionDate')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Show when={loading}>
                                        <SkeletonDesktop />
                                    </Show>
                                    <Show when={!loading}>
                                        <Show when={error}>
                                            <td colSpan={6}>
                                                <Alert severity="error" withIcon>
                                                    {error?.message ?? t('common:error:fetchError')}
                                                </Alert>
                                            </td>
                                        </Show>

                                        <Show when={!error}>
                                            <Show when={hasData}>
                                                <>
                                                    {data?.transaction_history?.items?.map((val, index) => (
                                                        <tr className={cx('swift-table-row', 'even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{val.transactionId}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{formatPoint(val.balance)}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">
                                                                    {val.comment.split('<a').length > 1
                                                                    && val.comment.includes('/sales/order/view/order_id') ? (
                                                                        <div
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: `${val.comment.split('<a')[0]}
                                                                            <a href="${getPath(val.comment)}">#${getId(val.comment)}</a>`,
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div dangerouslySetInnerHTML={{ __html: val.comment }} />
                                                                    )}
                                                                </Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">
                                                                    {val.expirationDate ? formatDate(val.expirationDate, 'DD/MM/YYYY') : '-'}
                                                                </Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography
                                                                    variant="bd-2b"
                                                                    className={cx(val?.points < 0 ? '!text-red-500' : '!text-green-500')}
                                                                >
                                                                    {formatPoint(val.points)}
                                                                </Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">
                                                                    {val.transactionDate ? formatDate(val.transactionDate, 'DD/MM/YYYY') : '-'}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            </Show>

                                            <Show when={!hasData}>
                                                <td colSpan={6}>
                                                    <Alert severity="warning" withIcon>
                                                        {t('rewardpoint:emptyMessage')}
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
                        <RewardPointInfoComponent />

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
                                        {data?.transaction_history?.items?.map((val, index) => (
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
                                                <MobileTableItemComponent label={t('rewardpoint:transactionId')} value={val.transactionId} />
                                                <MobileTableItemComponent label={t('rewardpoint:balance')} value={formatPoint(val.balance)} />
                                                <MobileTableItemComponent
                                                    label={t('rewardpoint:comment')}
                                                    CustomComponentValue={(
                                                        <Typography variant="bd-2b">
                                                            {val.comment.split('<a').length > 1
                                                            && val.comment.includes('/sales/order/view/order_id') ? (
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: `${val.comment.split('<a')[0]}
                                                                            <a 
                                                                                class='swift-mobile-action-vieworder' 
                                                                                href="${getPath(val.comment)}"
                                                                            >
                                                                                #${getId(val.comment)}
                                                                            </a>`,
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div dangerouslySetInnerHTML={{ __html: val.comment }} />
                                                            )}
                                                        </Typography>
                                                      )}
                                                />
                                                <MobileTableItemComponent
                                                    label={t('rewardpoint:expired')}
                                                    value={val.expirationDate ? formatDate(val.expirationDate, 'DD/MM/YYYY') : '-'}
                                                />
                                                <MobileTableItemComponent
                                                    label={t('rewardpoint:point')}
                                                    CustomComponentValue={(
                                                        <Typography
                                                            variant="bd-2b"
                                                            className={cx(val?.points < 0 ? '!text-red-500' : '!text-green-500')}
                                                        >
                                                            {formatPoint(val.points)}
                                                        </Typography>
                                                      )}
                                                />
                                                <MobileTableItemComponent
                                                    label={t('rewardpoint:transactionDate')}
                                                    value={val.transactionDate ? formatDate(val.transactionDate, 'DD/MM/YYYY') : '-'}
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

export default RewardPointView;
