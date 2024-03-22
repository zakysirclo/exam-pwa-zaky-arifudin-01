/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable object-curly-newline */
/* eslint-disable eqeqeq */
import Typography from '@common_typography';
import dynamic from 'next/dynamic';
import React from 'react';
import { features } from '@config';
import { getHost } from '@helper_config';
import cx from 'classnames';
import Image from '@common_image';
import Button from '@common/Button';
import InfoIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import ChatIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import Dialog from '@common/Dialog';
import Share from '@common_share';
import useMediaQuery from '@root/core/hooks/useMediaQuery';
import Show from '@common/Show';

// CHAT FEATURES IMPORT

const ChatContent = dynamic(() => import('@core_modules/customer/plugins/ChatPlugin'), { ssr: false });

// END CHAT FEATURES IMPORT

const SellerInfo = (props) => {
    const { storeConfig, t, dataSeller, errorSeller, loadingSeller, link, sellerId, isLogin, route, handleChat, showChat, ...other } = props;

    const [openInfoPanel, setOpenInfoPanel] = React.useState(false);
    const [openSharePanel, setOpenSharePanel] = React.useState(false);

    const handleOpenInfoPanel = () => {
        setOpenInfoPanel(true);
    };

    const handleOpenSharePanel = () => {
        setOpenSharePanel(true);
    };

    const handleCloseInfoPanel = () => {
        setOpenInfoPanel(false);
    };

    const handleCloseSharePanel = () => {
        setOpenSharePanel(false);
    };

    const { isMobile } = useMediaQuery();

    return (
        <div className={cx(
            'flex flex-row justify-between items-center',
            'rounded-lg shadow-base p-5',
            'border border-neutral-100',
        )}
        >
            <div className="flex flex-row  items-center gap-4">
                <div className="w-[70px] h-[70px] bg-neutral-300 rounded-full overflow-hidden">
                    <Image src={dataSeller.getSeller[0].logo} classContainer="w-[70px] h-[70px]" className="w-[70px] h-[70px]" />
                </div>
                <div className="flex flex-col gap-1">
                    <Typography variant="h2" className="capitalize">
                        {dataSeller.getSeller[0].name}
                    </Typography>
                    <Typography className="capitalize">
                        {dataSeller.getSeller[0].city.split(', ')[0]}
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-3">
                    <Button
                        className={isMobile ? '!p-0' : '!px-3 !py-1 hover:border-primary'}
                        classNameText="text-md group-hover:text-primary"
                        variant={isMobile ? 'plain' : 'outlined'}
                        icon={<InfoIcon />}
                        iconProps={{ className: 'w-3 h-3' }}
                        iconPosition="right"
                        onClick={handleOpenInfoPanel}
                        iconOnly={isMobile}
                    >
                        {t('seller:button:about')}
                    </Button>

                    <Show when={features.chatSystem.enable}>
                        <Button
                            className={isMobile ? '!p-0' : '!px-3 !py-1 hover:border-primary'}
                            variant={isMobile ? 'plain' : 'outlined'}
                            classNameText="text-md group-hover:text-primary"
                            icon={<ChatIcon />}
                            iconPosition="right"
                            iconProps={{ className: 'w-3 h-3' }}
                            onClick={handleChat}
                            iconOnly={isMobile}
                        >
                            {t('seller:button:chat')}
                        </Button>
                    </Show>

                    <Show when={!isMobile}>
                        <Button
                            className={isMobile ? '!p-0' : '!px-3 !py-1 hover:border-primary'}
                            variant={isMobile ? 'plain' : 'outlined'}
                            classNameText="text-md group-hover:text-primary"
                            icon={<ShareIcon />}
                            iconPosition="right"
                            iconProps={{ className: 'w-3 h-3' }}
                            onClick={handleOpenSharePanel}
                            iconOnly={isMobile}
                        >
                            {t('seller:share')}
                        </Button>
                    </Show>
                    <Show when={isMobile}>
                        <Share />
                    </Show>
                </div>
                {/* CHAT FEATURES ON DESKTOP */}
                {features.chatSystem.enable && (
                    <div>
                        {isLogin == 1 && showChat ? (
                            <ChatContent
                                isSellerPage
                                handleChatSellerPage={handleChat}
                                agentSellerCode={dataSeller.getSeller[0].id}
                                agentSellerName={dataSeller.getSeller[0].name}
                                sellerMessage={`${getHost() + route.asPath}`}
                            />
                        ) : null}
                    </div>
                )}
                {/* END CHAT FEATURES ON DESKTOP */}
            </div>
            <Dialog
                open={openInfoPanel}
                onClose={handleCloseInfoPanel}
                onClickCloseTitle={handleCloseInfoPanel}
                useCloseTitleButton
                closeOnBackdrop
                title={t('seller:button:about')}
                content={(
                    <div className="flex flex-col gap-4">
                        <div className="">
                            <Typography variant="h3" className="capitalize">
                                {t('seller:description')}
                            </Typography>
                            <Typography variant="bd-2b">
                                <div dangerouslySetInnerHTML={{ __html: dataSeller.getSeller[0].description }} />
                            </Typography>
                        </div>
                        <div className="">
                            <Typography variant="h3" className="capitalize">
                                {t('seller:address')}
                            </Typography>
                            <Typography variant="bd-2b">
                                {dataSeller.getSeller[0].address}
                            </Typography>
                        </div>
                    </div>
                )}
            />
            <Dialog
                open={openSharePanel}
                onClose={handleCloseSharePanel}
                onClickCloseTitle={handleCloseSharePanel}
                useCloseTitleButton
                closeOnBackdrop
                title={t('seller:share')}
                content={(
                    <Share size="lg" showLabel={false} />
                )}
            />
        </div>
    );

    // return (
    //     <>
    //         <Paper elevation={3} className={styles.sellerPaper}>
    //             <Box className={styles.sellerPanel}>
    //                 <Grid container spacing={2}>
    //                     <Grid item xs={3} xm={3} sm={3} md={3} lg={2} className={styles.sellerLogoWrapper}>
    //                         <Avatar alt="Remy Sharp" src={dataSeller.getSeller[0].logo} className={styles.sellerLogo} variant="rounded" />
    //                     </Grid>
    //                     <Grid item xs={9} xm={6} sm={6} md={6} lg={8}>
    //                         <div className={styles.sellerName}>
    //                             <Typography variant="h2" className="capitalize">
    //                                 {dataSeller.getSeller[0].name}
    //                             </Typography>
    //                             <Typography variant="span" className="capitalize">
    //                                 {dataSeller.getSeller[0].city.split(', ')[0]}
    //                             </Typography>
    //                         </div>
    //                     </Grid>
    //                     <Grid item xs={12} xm={3} sm={3} md={3} lg={2}>
    //                         <IconButton onClick={handleOpenInfoPanel}>
    //                             <InfoIcon className={styles.sellerActionIcon} />
    //                         </IconButton>
    //                         {isLogin !== 1 || !showChat ? (
    //                             <IconButton className={styles.sellerActionIcon} onClick={handleChat}>
    //                                 <ChatIcon className={styles.sellerActionIcon} />
    //                             </IconButton>
    //                         ) : null}
    //                         <IconButton onClick={handleOpenSharePanel}>
    //                             <ShareIcon className={styles.sellerActionIcon} />
    //                         </IconButton>
    //                     </Grid>
    //                 </Grid>
    //                 {/* CHAT FEATURES ON DESKTOP */}
    //                 {features.chatSystem.enable && (
    //                     <div>
    //                         {isLogin == 1 && showChat ? (
    //                             <ChatContent
    //                                 isSellerPage
    //                                 handleChatSellerPage={handleChat}
    //                                 agentSellerCode={dataSeller.getSeller[0].id}
    //                                 agentSellerName={dataSeller.getSeller[0].name}
    //                                 sellerMessage={`${getHost() + route.asPath}`}
    //                             />
    //                         ) : null}
    //                     </div>
    //                 )}
    //                 {/* END CHAT FEATURES ON DESKTOP */}
    //             </Box>
    //         </Paper>
    //         <Dialog
    //             open={openInfoPanel}
    //             onClose={handleCloseInfoPanel}
    //             aria-labelledby="alert-dialog-title"
    //             aria-describedby="alert-dialog-description"
    //             className={styles.sellerInfoPanel}
    //         >
    //             <DialogTitle id="alert-dialog-title">
    //                 {' '}
    //                 <IconButton onClick={handleCloseInfoPanel} className={styles.closePanelIcon}>
    //                     <CloseIcon />
    //                 </IconButton>
    //             </DialogTitle>
    //             <DialogContent>
    //                 <DialogContentText id="alert-dialog-description">
    //                     <div className={styles.description}>
    //                         <Typography variant="h3" className="capitalize">
    //                             {t('seller:description')}
    //                         </Typography>
    //                         <Typography type="regular" variant="body2">
    //                             <div dangerouslySetInnerHTML={{ __html: dataSeller.getSeller[0].description }} />
    //                         </Typography>
    //                     </div>
    //                     <div className={styles.address}>
    //                         <Typography variant="h3" className="capitalize">
    //                             {t('seller:address')}
    //                         </Typography>
    //                         <Typography type="regular" variant="body2">
    //                             {dataSeller.getSeller[0].address}
    //                         </Typography>
    //                     </div>
    //                 </DialogContentText>
    //             </DialogContent>
    //         </Dialog>
    //         <Dialog
    //             open={openSharePanel}
    //             onClose={handleCloseSharePanel}
    //             aria-labelledby="alert-dialog-title"
    //             aria-describedby="alert-dialog-description"
    //             className={styles.sharePanel}
    //         >
    //             <DialogTitle id="alert-dialog-title">
    //                 {' '}
    //                 <IconButton onClick={handleCloseSharePanel} className={styles.closePanelIcon}>
    //                     <CloseIcon />
    //                 </IconButton>
    //             </DialogTitle>
    //             <DialogContent>
    //                 <DialogContentText id="alert-dialog-description">
    //                     <div className={styles.description}>
    //                         <Typography variant="h3" className="capitalize">
    //                             {t('seller:share')}
    //                         </Typography>
    //                     </div>
    //                     <div className={styles.address}>
    //                         {/* <ItemShare link={link} /> */}
    //                     </div>
    //                 </DialogContentText>
    //             </DialogContent>
    //         </Dialog>
    //     </>
    // );
};

export default SellerInfo;
