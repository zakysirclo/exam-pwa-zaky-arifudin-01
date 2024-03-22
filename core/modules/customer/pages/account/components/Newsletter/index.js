/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { withTranslation } from 'next-i18next';
import { WHITE } from '@theme_color';
import Newsletter from '@plugin_newsletter';

const NewsletterMobile = (props) => {
    const { open, handleClose, t } = props;

    return null;
    // return (
    //     <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
    //         <AppBar className={classes.appBar}>
    //             <Toolbar>
    //                 <IconButton edge="start" onClick={handleClose} aria-label="close">
    //                     <CloseIcon />
    //                 </IconButton>
    //                 <Typography variant="h6" className={classes.title}>
    //                     {t('common:newsletter:title')}
    //                 </Typography>
    //             </Toolbar>
    //         </AppBar>
    //         <Newsletter />
    //     </Dialog>
    // );
};

export default (withTranslation()(NewsletterMobile));
