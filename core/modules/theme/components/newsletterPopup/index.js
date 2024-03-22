/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import WidgetNewsletterPopup from '@core_modules/cms/components/cms-renderer/widget-newsletter-popup/index';
import Button from '@common_button';
import Dialog from '@common_dialog';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { getCmsBlocks, getIsSubscribedCustomer } from '@core_modules/theme/services/graphql';
import { breakPointsUp } from '@helper_theme';
import { useEffect, useState } from 'react';

const NewsletterPopup = (props) => {
    const {
        t, storeConfig, pageConfig, isLogin,
    } = props;
    const { data } = getCmsBlocks({
        identifiers: 'weltpixel_newsletter_v5',
    });
    const [getCustomer, { data: customerData }] = getIsSubscribedCustomer();
    const [open, setOpen] = useState(!Cookies.get('newsletter_closed'));
    // const triggerButtonColors = {
    //     color: storeConfig.weltpixel_newsletter_general_trigger_button_color,
    //     bgColor: storeConfig.weltpixel_newsletter_general_trigger_button_backgroundcolor,
    // };
    const desktop = breakPointsUp('sm');

    useEffect(() => {
        if (isLogin) {
            getCustomer();
        }
    }, [open]);

    // 20 seconds
    // const expires = new Date(new Date().getTime() + 1 * 20 * 1000);

    const percentToHex = (p) => {
        const intValue = Math.round(p * 255); // map percent to nearest integer (0 - 255)
        const hexValue = intValue.toString(16); // get hexadecimal representation
        return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
    };

    const handleClose = () => {
        Cookies.set('newsletter_closed', true, { expires: Number(storeConfig.weltpixel_newsletter_general_popup_cookie_lifetime) });
        setOpen(!open);
    };

    if ((isLogin && isLogin == 1) && customerData?.customer?.is_subscribed) return null;
    if (storeConfig.weltpixel_newsletter_general_display_mobile === '0' && !desktop) return null;
    if (storeConfig.weltpixel_newsletter_general_display_mode === '0' && pageConfig.pageType !== 'home') return null;
    if (pageConfig.pageType === 'checkout') return null;

    return (
        <>
            {storeConfig.weltpixel_newsletter_general_enable_trigger_button === '1' && (
                <Button onClick={() => setOpen(!open)} variant="contained">
                    {storeConfig.weltpixel_newsletter_general_trigger_button_title}
                </Button>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <XMarkIcon id="newsletter-handleClose-btn" onClick={handleClose} />
                {data ? (
                    <div className={classNames('cms-container')}>
                        <WidgetNewsletterPopup t={t} storeConfig={storeConfig} data={data} handleClose={handleClose} />
                    </div>
                ) : null}
            </Dialog>
        </>
    );
};

export default NewsletterPopup;
