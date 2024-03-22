import Typography from '@common_typography';
import Image from '@common_image';
import RatingStar from '@common_ratingstar';
import formatDate from '@helper_date';
import Dialog from '@common/Dialog';
import Link from 'next/link';
import React from 'react';
import cx from 'classnames';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

const ProductReview = (props) => {
    const {
        open, setOpen, reviewItem, t, storeConfig,
    } = props;

    if (!reviewItem) {
        return <></>;
    }

    const ratingProduct = reviewItem?.product?.rating_summary ? parseInt(reviewItem.product.rating_summary, 10) / 20 : 0;

    return (
        <Dialog variant="plain" open={open}>
            <div>
                <div
                    className={cx(
                        'desktop:w-[500px] tablet:w-[400px] mobile:w-[300px]',
                        'bg-neutral-white',
                        'rounded-[10px]',
                        'p-[15px]',
                        'm-[15px]',
                    )}
                >
                    <div className={cx('overflow-y-auto', 'max-h-[85vh]')}>
                        <div className={cx('pb-[10px]', 'flex justify-end')}>
                            <div
                                onClick={() => setOpen(false)}
                                aria-label="close"
                                aria-hidden="true"
                                className={cx('bg-neutral-white', 'h-[30px]', 'w-[30px]', 'hover:cursor-pointer')}
                            >
                                <XMarkIcon className="text-neutral-500" />
                            </div>
                        </div>

                        <div className="flex desktop:flex-row tablet:flex-row mobile:flex-col">
                            <div className={cx('desktop:w-[250px] tablet:w-[200px] mobile:w-[150px]', 'self-center')}>
                                <Image
                                    src={reviewItem.product.image.url}
                                    height={250}
                                    width={250}
                                    heightMobile={150}
                                    widthMobile={150}
                                    storeConfig={storeConfig}
                                />
                            </div>
                            <div className={cx('desktop:w-[calc(100%-250px)] tablet:w-[calc(100%-200px)]')}>
                                <Typography variant="bd-b2" className={cx('uppercase', 'font-bold')}>
                                    {reviewItem.product.name}
                                </Typography>
                                <div className={cx('flex', 'flex-col', 'justify-between', 'mt-[15px]', 'gap-[10px]')}>
                                    <div className="flex">
                                        <RatingStar value={ratingProduct} />
                                    </div>
                                    <Typography variant="bd-b2" className={cx('!text-primary-700', '!hover:underline')}>
                                        <Link href={`/${reviewItem.product.url_key}`} legacyBehavior>
                                            <a target="_blank" rel="noopener noreferrer">
                                                {t('productreview:review')}
                                            </a>
                                        </Link>
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div className={cx('mt-[20px]', 'px-[10px]')}>
                            <div className={cx('text-center', 'border-b-[2px]', 'border-neutral-100', 'pb-[10px]')}>
                                <Typography variant="bd-2a" className={cx('ml-[0px]')}>
                                    {t('productreview:yourReview')}
                                </Typography>
                            </div>

                            <div className={cx('flex', 'mt-[10px]', 'flex-col')}>
                                <div className={cx('flex', 'flex-row', 'content-center', 'gap-[15px]')}>
                                    <Typography variant="bd-3a">{t('productreview:rating')}</Typography>
                                    <RatingStar value={reviewItem.ratings_breakdown.length > 0 ? reviewItem.ratings_breakdown[0].value : 0} />
                                </div>
                            </div>
                            <div className={cx('flex', 'justify-between', 'flex-col')}>
                                <Typography variant="bd-3a" className={cx('!font-bold', 'mt-[10px]')}>
                                    {reviewItem.summary}
                                </Typography>
                                <Typography variant="bd-3a" className={cx('mt-[15px]')}>
                                    {reviewItem.text}
                                </Typography>
                                <Typography variant="bd-3a" className={cx('!text-neutral-500', 'mt-[15px]')}>
                                    {t('productreview:submittedOn')}
                                    {' '}
                                    {formatDate(reviewItem.created_at, 'DD/MM/YYYY')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

const DetailProductReview = (props) => <ProductReview {...props} />;

export default DetailProductReview;
