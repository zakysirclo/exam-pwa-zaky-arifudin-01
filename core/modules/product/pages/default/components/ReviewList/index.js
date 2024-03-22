/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React, { useEffect, useMemo, useState } from 'react';
import { getReviews, addReview } from '@core_modules/product/services/graphql';
import { useFormik } from 'formik';
import Button from '@common_button';
import Typography from '@common_typography';
import dynamic from 'next/dynamic';
import ReviewCardForm from '@core_modules/product/pages/default/components/ReviewCardForm';
import Show from '@common_show';
import Divider from '@common_divider';
import Dialog from '@common_dialog';
import useMediaQuery from '@hook/useMediaQuery';
import PaginationSection from '@plugin_productlist/components/PaginationSection';
import cx from 'classnames';
import * as Schema from '@core_modules/product/services/graphql/schema';
import * as Yup from 'yup';

const ReviewCard = dynamic(() => import('@core_modules/product/pages/default/components/ReviewCard'), { ssr: false });
const RatingStar = dynamic(() => import('@common_ratingstar'), { ssr: true });

const ReviewList = ({
    t,
    data: dataProduct,
    storeConfig,
    isLogin,
}) => {
    const { isMobile } = useMediaQuery();
    const [openReviewForm, setOpenReviewForm] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [, setIsClient] = useState(false);
    const [reviewParams] = React.useState({
        sku: dataProduct?.sku || '',
        pageSize: 5,
    });
    const guest_review = storeConfig?.allow_guests_to_write_product_reviews;
    const { loading, fetchMore, data } = getReviews(reviewParams);
    const [addProductReview, { loading: loadingAddReview }] = addReview();

    const validationSchema = Yup.object().shape({
        nickname: Yup.string().required(t('product:validate:nickname')),
        title: Yup.string().required(t('product:validate:title')),
        detail: Yup.string().required(t('product:validate:detail')),
        rating: Yup.string().required(t('product:validate:rating')).nullable(),
    });

    let review = {};
    review = data && data.getProductReviews
        ? data.getProductReviews
        : {
            items: [],
            totalCount: 0,
        };

    const Formik = useFormik({
        initialValues: {
            nickname: '',
            rating: null,
            title: '',
            detail: '',
            pkValue: dataProduct?.id,
        },
        validationSchema,
        onSubmit: (value, { resetForm }) => {
            resetForm({});
            addProductReview({
                variables: {
                    ...value,
                },
            }).then(() => {
                setOpenReviewForm(false);
                window.toastMessage({
                    open: true,
                    text: t('product:addRateSuccess'),
                    variant: 'success',
                });
            }).catch(() => {
                setOpenReviewForm(false);
                window.toastMessage({
                    open: true,
                    text: t('product:addRateFailed'),
                    variant: 'error',
                });
            });
        },
    });

    const onWriteReview = () => {
        setOpenReviewForm(true);
    };

    const handleChangePage = async (pageInput) => {
        try {
            if (fetchMore && typeof fetchMore !== 'undefined' && pageInput <= review.totalCount) {
                setPage(pageInput);
                return fetchMore({
                    query: Schema.getReview(),
                    fetchPolicy: 'cache-and-network',
                    variables: {
                        sku: reviewParams.sku,
                        currentPage: pageInput,
                        pageSize: reviewParams.pageSize,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        const prevItems = previousResult.getProductReviews;
                        const newItems = fetchMoreResult.getProductReviews;
                        return {
                            getProductReviews: {
                                // eslint-disable-next-line no-underscore-dangle
                                __typename: newItems.__typename,
                                totalCount: newItems.totalCount,
                                message: prevItems.message,
                                // items: [...prevItems.items, ...newItems.items],
                                items: [...newItems.items],
                            },
                        };
                    },
                });
            }
        } catch (error) {
            console.log('[err] fetch review', error);
        }
        return null;
    };

    useEffect(() => {
        setIsClient(true);
    }, [loading]);

    const getReviewsCount = useMemo(() => {
        let reviewCalculate = 0;
        if (review?.items && review?.items?.length > 0) {
            let totalReview = 0;
            let totalReviewer = 0;
            review?.items?.map((item) => {
                const getRatings = item?.ratings;
                getRatings?.map((itemRating) => {
                    const getRatingValue = itemRating?.value;
                    totalReview += getRatingValue;
                    totalReviewer += 1;
                });
            });

            reviewCalculate = totalReview / totalReviewer;
        }
        return reviewCalculate;
    }, [review]);

    return (
        <div className={cx(
            'container-review-list',
        )}
        >
            <Dialog
                open={openReviewForm}
                useCloseTitleButton
                onClickCloseTitle={() => {
                    setOpenReviewForm(false);
                }}
                classContainer={
                    cx(
                        isMobile && 'absolute bottom-0 !m-0 p-0',
                    )
                }
                classContainerAction={
                    cx(
                        isMobile && 'rounded-b-[0px] bg-neutral-white !px-[16px]',
                    )
                }
                classContent={
                    cx(
                        isMobile && 'pb-[0px]',
                    )
                }
                title={t('common:label:writeReview')}
                content={<ReviewCardForm t={t} Formik={Formik} />}
                negativeLabel={t('common:button:cancel')}
                negativeAction={isMobile ? null : () => {
                    setOpenReviewForm(false);
                }}
                positiveLabel={t('common:button:submitReview')}
                positiveProps={{
                    icon: loadingAddReview,
                    loading: loadingAddReview,
                }}
                positiveAction={() => {
                    Formik.handleSubmit();
                }}
            />
            <div className={cx('container-review-list-sub')}>
                <div className="container-review-list-label">
                    <Typography variant="h1" className={cx('review-list-label-title', 'mb-[12px]')}>
                        {t('product:customerReview')}
                    </Typography>
                </div>
                <div
                    className={cx(
                        'container-review-list-action',
                        'flex justify-between sm:items-center sm:flex-row',
                        'mb-[24px]',
                        'xs:flex-col xs:items-start xs:gap-y-[14px]',
                    )}
                >
                    <div className={cx('review-list-label-rating', 'flex items-center')}>
                        <RatingStar value={getReviewsCount || 0} />
                        <Typography variant="p-2" className="ml-[6px]">
                            {`(${(review?.totalCount) || 0} ${t('product:review')})`}
                        </Typography>
                    </div>
                    <Show when={isLogin == 1 || guest_review === '1'}>
                        <Button
                            variant="outlined"
                            onClick={() => onWriteReview()}
                            className={cx(
                                'xs:py-[8px] xs:px-[16px]',
                                'sm:py-[10px] sm:px-[20px]',
                                'swift-action-toreview',
                            )}
                        >
                            <Typography variant="bd-2" type="bold" letter="uppercase">
                                {t('product:writeReview')}
                            </Typography>
                        </Button>
                    </Show>
                </div>
            </div>
            <Divider />
            <div className={cx('mt-[24px]')}>
                {review && review.items.map((item, index) => <ReviewCard key={index} {...item} />)}
                <PaginationSection
                    page={page}
                    totalPage={review.totalCount < reviewParams.pageSize ? 1 : Math.ceil(review.totalCount / reviewParams.pageSize)}
                    handleChangePage={handleChangePage}
                    siblingCount={0}
                />
            </div>
        </div>
    );
};

export default ReviewList;
