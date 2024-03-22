/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import RatingStar from '@common_ratingstar';
import Show from '@common_show';
import Typography from '@common_typography';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Link from 'next/link';
import cx from 'classnames';
import { SkeletonDesktop, SkeletonMobile } from '@core_modules/productreview/pages/default/components/skeleton';
import DetailProductReview from '@core_modules/productreview/pages/default/components/detail';
import Alert from '@common_alert';
import { createExcerpt } from '@helper_text';
import MobileTabletActionMenu from '@core_modules/productreview/pages/default/components/plugins/MobileTabletActionMenu';
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

const ProductReviewPage = (props) => {
    const {
        t, reviewCustomer, loading, error, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, storeConfig,
    } = props;
    const { isDesktop } = useMediaQuery();
    const [isOpenDetail, setOpenDetail] = React.useState(false);
    const [reviewItem, setReviewItem] = React.useState(null);

    const openDetail = (state, val = null) => {
        setOpenDetail(state);
        setReviewItem(val);
    };

    useEffect(() => {
        if (!isOpenDetail) {
            setReviewItem(null);
        }
    }, [isOpenDetail]);

    const hasData = reviewCustomer?.items && reviewCustomer?.items?.length > 0;
    const pageInfo = reviewCustomer?.page_info;

    const PaginationComponent = () => (
        <div className={cx('table-data pt-6 flex justify-between', 'tablet:items-center tablet:flex-row', 'mobile:flex-col')}>
            <div className="flex justify-between items-center flex-1">
                <Typography className={cx('font-normal', 'leading-2lg')}>
                    {`${reviewCustomer?.items?.length ?? 0} ${t('common:label:data')}`}
                </Typography>
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
                                value: (pageInfo?.total_pages ?? 1) * rowsPerPage,
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
            <div className={cx('productreview-container')}>
                {/** Modal See Detail */}
                <DetailProductReview
                    t={t}
                    open={isOpenDetail}
                    setOpen={setOpenDetail}
                    reviewItem={reviewItem}
                    storeConfig={storeConfig}
                />

                {/** Desktop */}
                <Show when={isDesktop}>
                    <div className={cx('desktop-view')}>
                        <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                            <table className={cx('swift-table-productreviews', 'w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                                <thead>
                                    <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                        <th className={cx('px-4', 'py-3')}>{t('productreview:created')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('productreview:productName')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('productreview:rating')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('productreview:review')}</th>
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
                                                    {reviewCustomer?.items?.map((val, index) => (
                                                        <tr className={cx('swift-table-row', 'even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{formatDate(val.created_at, 'DD/MM/YYYY')}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Link href={`/${val.product.url_key}`} legacyBehavior>
                                                                    <a className="swift-action-viewproduct" target="_blank" rel="noopener noreferrer">
                                                                        <Typography
                                                                            variant="bd-2b"
                                                                            className={cx('!text-primary-700', 'hover:underline')}
                                                                        >
                                                                            {val.product.name}
                                                                        </Typography>
                                                                    </a>
                                                                </Link>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <RatingStar value={val?.ratings_breakdown[0]?.value ?? 0} />
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <Typography variant="bd-2b">{createExcerpt(val.text, 80)}</Typography>
                                                            </td>
                                                            <td className={cx('p-4')}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openDetail(true, val)}
                                                                    aria-label="see-details"
                                                                    className="w-max"
                                                                >
                                                                    <a>
                                                                        <Typography
                                                                            variant="bd-2b"
                                                                            className={cx(
                                                                                'swift-action-viewreview',
                                                                                '!text-primary-700',
                                                                                'hover:underline',
                                                                            )}
                                                                        >
                                                                            {t('productreview:seeDetails')}
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
                                                        {t('productreview:emptyMessage')}
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
                                        {reviewCustomer?.items?.map((val, index) => (
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
                                                <div className={cx('flex', 'justify-end')}>
                                                    <MobileTabletActionMenu t={t} openDetail={() => openDetail(true, val)} />
                                                </div>
                                                <MobileTableItemComponent
                                                    label={t('productreview:created')}
                                                    value={formatDate(val.created_at, 'DD/MM/YYYY')}
                                                />
                                                <MobileTableItemComponent
                                                    label={t('productreview:productName')}
                                                    CustomComponentValue={(
                                                        <Link href={`/${val.product.url_key}`} legacyBehavior>
                                                            <a>
                                                                <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                                                    {val.product.name}
                                                                </Typography>
                                                            </a>
                                                        </Link>
                                                    )}
                                                />
                                                <MobileTableItemComponent
                                                    label={t('productreview:rating')}
                                                    CustomComponentValue={<RatingStar value={val?.ratings_breakdown[0]?.value ?? 0} />}
                                                />
                                                <MobileTableItemComponent label={t('productreview:review')} value={createExcerpt(val.text, 80)} />
                                            </div>
                                        ))}
                                        <PaginationComponent />
                                    </>
                                </Show>
                                <Show when={!hasData}>
                                    <Alert severity="warning" withIcon>
                                        {t('productreview:emptyMessage')}
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

export default ProductReviewPage;
