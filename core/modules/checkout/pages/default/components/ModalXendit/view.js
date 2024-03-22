/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Dialog from '@common_dialog';
import Button from '@common_button';
import Typography from '@common_typography';
import cx from 'classnames';

const ModalXenditView = (props) => {
    const {
        open, setOpen, iframeUrl, handleCloseXendit, t,
        payment_code, mode,
        handleSimulateQr, loadSimulate,
    } = props;

    return (
        <Dialog
            variant="plain"
            open={open}
        >
            <Button
                color="primary"
                className={
                    cx(
                        'xendit-btn-close bg-neutral-black !rounded-full absolute',
                        'desktop:right-space-600 desktop:top-0',
                        'mobile:right-space-100 mobile:top-space-100',
                        'scrollbar-none',
                    )
                }
                onClick={() => {
                    setOpen();
                    handleCloseXendit();
                }}
                disabled={loadSimulate}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </Button>
            <div className="dialog-content p-0 bg-neutral-white desktop:w-[500px] desktop:h-[500px] mobile:w-full mobile:h-full scrollbar-none">
                {
                    payment_code === 'qr_codes' && mode && mode === 'test' && (
                        <div className="form qr-simulate">
                            <Button
                                disabled={loadSimulate}
                                type="button"
                                className="btn-qr-code"
                                onClick={() => handleSimulateQr()}
                                loading={loadSimulate}
                            >
                                <Typography variant="bd-2" letter="uppercase" type="bold" color="white">
                                    {t('common:button:simulateQrCode')}
                                </Typography>

                            </Button>
                        </div>
                    )
                }
                {
                    payment_code === 'qr_codes'
                        ? (
                            <img
                                id="iframe-invoice"
                                className="img-qr-code"
                                alt="Invoice"
                                src={iframeUrl}
                            />
                        ) : (
                            <iframe
                                id="iframe-invoice"
                                className="iframe-invoice w-full"
                                title="Invoice"
                                src={iframeUrl}
                            />
                        )
                }
            </div>
            <style jsx global>
                {`

                
                    .modal-xendit {
                        background: transparent;
                    }
                    .modal-xendit-paper {
                        overflow-y: visible;
                    }
                   .modal-xendit-box {
                       padding: 0px;
                       width: 600px;
                       background: transparent;
                       height: calc(100vh - 150px);
                       overflow: hidden;
                   }
                   .iframe-invoice {
                        height: inherit;
                        width: inherit;
                        border: 0;
                        overflow-y: scroll;
                    }

                    .img-qr-code { 
                        height: 80%;
                        width: inherit;
                        margin-bottom: 10%;
                    }

                    .qr-simulate {
                        padding: 15px;
                        margin-top: 5%;
                    }

                    .btn-qr-code {
                        height: 45px;
                        padding: 5px;
                    }

                    @media screen and (max-width: 768px) {
                        .modal-xendit-box {
                            padding: 0px;
                            height: calc(100vh - 40px);
                            width: calc(100vw - 70px);
                            overflow: hidden;
                        }
                    }
                    
                `}
            </style>
        </Dialog>
    );
};

export default ModalXenditView;
