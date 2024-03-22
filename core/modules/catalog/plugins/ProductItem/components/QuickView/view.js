import Dialog from '@common/Dialog';
import cx from 'classnames';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import ProductDetailAction from '@plugin_productdetailaction';
import { modules } from '@config';
import useMediaQuery from '@hook/useMediaQuery';

const QuickView = (props) => {
    const {
        open, handleClose, ...other
    } = props;

    const {
        screen,
    } = useMediaQuery();

    const mainImage = modules.catalog.productListing.quickView.bannerImage[screen];

    return (
        <Dialog
            open={open}
            variant="container"
            classWrapperTitle="!hidden"
            content={(
                <div className={cx(
                    'w-full flex flex-col desktop:flex-row-reverse gap-2 !bg-[transparent]',
                )}
                >
                    <div className="w-full desktop:w-auto flex justify-end">
                        <div
                            role="presentation"
                            onClick={handleClose}
                            className={cx(
                                'w-7 h-7 p-1 rounded-md justify-center items-center gap-1.5 inline-flex group',
                                'bg-neutral-white bg-opacity-40 hover:bg-primary',
                                'cursor-pointer',
                            )}
                        >
                            <XMarkIcon className="w-5 h-5 relative group-hover:text-neutral-white" />
                        </div>
                    </div>
                    <div className={cx(
                        'w-full h-max max-h-[calc(100vh-60px)] p-4 tablet:p-8 bg-neutral-white rounded-lg',
                        'shadow-xl overflow-y-scroll',
                    )}
                    >
                        <ProductDetailAction
                            useReviewList={false}
                            useProductTabs={false}
                            useProductImagePreview={false}
                            useShareProduct
                            classContainer="!mt-0 gap-4 tablet:gap-6"
                            useProductRelated={false}
                            imageSliderProps={{
                                detectAutoScreen: false,
                                horizontalThumbnail: true,
                                imageProps: {
                                    mainImageWidth: mainImage.width,
                                    mainImageHeight: mainImage.height,
                                },
                                customStyleImageWrapper: {
                                    width: mainImage.width,
                                    height: mainImage.height,
                                },
                                customStyleImageContainer: {
                                    width: mainImage.width,
                                    height: mainImage.height,
                                },

                                customClassImageWrapper: '!px-[0]',
                            }}
                            classContentWrapper={cx(
                                'desktop:!pl-0',
                                'desktop:!ml-0 tablet:!ml-0',
                                'desktop:!px-0 tablet:!px-0 mobile:!px-0',
                            )}
                            classImageSliderWrapper="overflow-hidden"
                            {...other}
                        />

                    </div>
                </div>
            )}
            classContainer="!shadow-none max-w-[360px] tablet:!max-w-[700px] desktop:!max-w-[945px]"
            classContent="!p-0 !bg-[transparent]"
        />
    );
};

export default QuickView;
