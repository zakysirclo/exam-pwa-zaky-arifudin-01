'use client';

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */

import React from 'react';
import Button from '@common_button';
import Dialog from '@common_dialog';
import Typography from '@common_typography';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import RedeemIcon from '@heroicons/react/24/outline/GiftIcon';
import ProductItem from '@plugin_productitem';

const Caraousel = dynamic(() => import('@common_slick/Caraousel'), { ssr: false });

const PromoModalItemView = (props) => {
    const {
        items, handleAddToCart, handleClickOpen, handleClose, open,
        availableMaxQty, customQty,
    } = props;

    const [triger, setTriger] = React.useState(false);
    const maxHeigtToShow = 51;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const header = document.getElementById('header');
            const checkScrollTop = () => {
                // handle show hide header
                if (header) {
                    if (window.pageYOffset > 51) {
                        header.classList.add('header-small');
                    } else {
                        header.classList.remove('header-small');
                    }
                }
                if (!triger && window.pageYOffset > maxHeigtToShow) {
                    setTriger(true);
                } else if (triger && window.pageYOffset < maxHeigtToShow) {
                    setTriger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [window, triger]);

    return (
        <>
            {availableMaxQty > 0 ? (
                <div className={triger
                    ? classNames(
                        'flex flex-row items-center justify-center',
                        'fixed top-0 left-0',
                        'text-neutral-100 bg-yellow-600',
                        'mb-4 w-full',
                    )
                    : classNames(
                        'flex flex-row items-center justify-center',
                        'absolute left-0 top-0 tablet:sticky',
                        'text-neutral-100 bg-yellow-600',
                        'mb-4 w-full',
                    )}
                >
                    <RedeemIcon className="w-5 h-5" />
            &nbsp;
                    <span className="py-2">
                        Select your
                        <Button className="!p-0 ml-3" variant="plain" onClick={handleClickOpen}>
                            <Typography color="text-neutral-white" type="bold" letter="uppercase">
                                Free Gift!
                            </Typography>
                        </Button>
                    </span>
                </div>
            ) : null }
            <Dialog
                open={open}
                onClose={handleClose}
                title={(
                    <div className="flex flex-col">
                        <Typography variant="h6">Free Promo Items</Typography>
                        <Typography variant="bd-2">{`Available max quatity : ${availableMaxQty}`}</Typography>
                    </div>
                )}
                useCloseTitleButton
                onClickCloseTitle={handleClose}
                content={(
                    <div className="pb-[70px] tablet:pb-0">
                        <Caraousel
                            data={items}
                            Item={ProductItem}
                            enableAddToCart
                            enableOption
                            handleAddToCart={handleAddToCart}
                            enableWishlist
                            enablePrice={false}
                            enableRating={false}
                            enableQuickView={false}
                            showQty
                            customQty={customQty}
                            maxQty={availableMaxQty}
                            slideLg={5}
                        />
                    </div>
                )}
            />
        </>
    );
};

export default PromoModalItemView;
