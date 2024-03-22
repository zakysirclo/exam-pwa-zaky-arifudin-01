import React from 'react';
import cx from 'classnames';
import Typography from '@common_typography';
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Dialog from '@common/Dialog';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

const ShareWishlistView = (props) => {
    const {
        open, setOpen, handleShareWishlist, t, shareLoading,
    } = props;
    const [emailCollection, setEmailCollection] = React.useState('');
    const [message, setMessage] = React.useState('');
    const handleSetEmail = (event) => {
        setEmailCollection(event.target.value);
    };
    const handleSetMessage = (event) => {
        setMessage(event.target.value);
    };
    const setShareWishlist = async () => {
        const response = await handleShareWishlist(emailCollection, message);
        if (response === 1) {
            setOpen();
        }
    };

    const handleClose = () => {
        setOpen(!open);
        document.body.style = '';
    };

    return (
        <Dialog
            open={open}
            variant="container"
            classWrapperTitle="!hidden"
            content={(
                <div
                    className={cx(
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
                        <div>
                            <Typography variant="h3" className={cx('mb-[18px]')}>
                                {t('customer:wishlist:wishlistSharing')}
                            </Typography>
                            <Typography variant="h4" className={cx('mb-[6px]')}>
                                {t('customer:wishlist:sharingInformation')}
                            </Typography>
                            <div>
                                <TextField
                                    label={t('customer:wishlist:labelEmail')}
                                    value={emailCollection}
                                    onChange={handleSetEmail}
                                    multiline
                                    error={false}
                                    className="w-full"
                                />
                            </div>
                            <div className="mt-[18px]">
                                <TextField
                                    label={t('customer:wishlist:message')}
                                    value={message}
                                    onChange={handleSetMessage}
                                    multiline
                                    error={false}
                                    className="w-full"
                                />
                            </div>
                            <div className="mt-[18px]">
                                <Button
                                    onClick={() => setShareWishlist()}
                                    loading={shareLoading}
                                >
                                    <Typography className={cx('!text-neutral-white uppercase')}>
                                        {t('customer:wishlist:shareWishlist')}
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            classContainer="!shadow-none max-w-[360px] tablet:!max-w-[700px] desktop:!max-w-[945px]"
            classContent="!p-0 !bg-[transparent]"
        />
    );
};

const ShareWishlistComponent = (props) => (
    <ShareWishlistView
        {...props}
    />
);

export default ShareWishlistComponent;
