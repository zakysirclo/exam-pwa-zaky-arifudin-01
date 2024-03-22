/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import Button from '@common_button';
import Typography from '@common_typography';
import NewsletterDialog from '@core_modules/customer/pages/account/components/Newsletter';
import { getResolver, setResolver } from '@helper_localstorage';
import Link from 'next/link';
import router from 'next/router';

// eslint-disable-next-line consistent-return
const FooterView = (props) => {
    const styles = {};
    const {
        t, isLogin, handleLogout, modules, data,
    } = props;
    const [openNewsletter, setOpenNewsletter] = React.useState(false);
    const handleClick = async (link) => {
        const urlResolver = getResolver();
        urlResolver[link] = {
            type: 'CMS_PAGE',
        };
        await setResolver(urlResolver);
        router.push('/[...slug]', link);
    };

    const handleToogleNewsletter = () => {
        setOpenNewsletter(!openNewsletter);
    };

    if (data && data.cmsBlocks.items[0].content && data.cmsBlocks.items[0] && data.cmsBlocks) {
        const { content } = data.cmsBlocks.items[0];
        return (
            <div className={styles.account_block}>
                <NewsletterDialog open={openNewsletter} handleClose={handleToogleNewsletter} />
                <div className="hidden-desktop">
                    <div className={styles.root}>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                    <ul className={styles.account_navigation}>
                        {modules.setting.enabled ? (
                            <li className={styles.account_navigation_item}>
                                <Button fullWidth variant="outlined" href="/setting">
                                    <Typography variant="span" type="bold" letter="uppercase">
                                        {t('common:setting:title')}
                                    </Typography>
                                </Button>
                            </li>
                        ) : null}

                        {isLogin ? (
                            <li className={styles.account_navigation_item}>
                                <Button fullWidth className={styles.logoutBtn} onClick={handleLogout} variant="primary">
                                    <Typography className={styles.logOutTxt} color="white" variant="span" type="bold" letter="uppercase">
                                        {t('customer:button:logout')}
                                    </Typography>
                                </Button>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={styles.account_block}>
                <NewsletterDialog open={openNewsletter} handleClose={handleToogleNewsletter} />
                <ul className={styles.account_navigation}>
                    {modules.about.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <>
                                <a onClick={() => handleClick('/about-us')} className={styles.account_navigation_link}>
                                    {t('customer:menu:aboutUs')}
                                </a>
                            </>
                        </li>
                    ) : null}

                    {modules.contact.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/contact" className={styles.account_navigation_link}>
                                {t('customer:menu:contactUs')}
                            </Link>
                        </li>
                    ) : null}

                    {modules.blog.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/blog" className={styles.account_navigation_link}>
                                {t('customer:menu:blog')}
                            </Link>
                        </li>
                    ) : null}
                    {modules.confirmpayment.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/confirmpayment" className={styles.account_navigation_link}>
                                {t('customer:menu:confirmPayment')}
                            </Link>
                        </li>
                    ) : null}
                    {modules.storeLocator.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/storelocator" className={styles.account_navigation_link}>
                                {t('customer:menu:findAStore')}
                            </Link>
                        </li>
                    ) : null}
                    {modules.trackingorder.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/sales/order/track" className={styles.account_navigation_link}>
                                {t('customer:menu:trackingOrder')}
                            </Link>
                        </li>
                    ) : null}

                    {modules.customer.plugin.newsletter.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Button className={styles.account_navigation_link} variant="text" onClick={handleToogleNewsletter}>
                                <a className={styles.account_navigation_link}>{t('common:newsletter:title')}</a>
                            </Button>
                        </li>
                    ) : null}

                    {modules.setting.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/setting" className={styles.account_navigation_link}>
                                {t('common:setting:title')}
                            </Link>
                        </li>
                    ) : null}

                    {isLogin ? (
                        <li className={styles.account_navigation_item}>
                            <Button className={styles.account_navigation_link} onClick={handleLogout} variant="text">
                                {t('customer:button:logout')}
                            </Button>
                        </li>
                    ) : null}
                </ul>
            </div>
        );
    }
};

export default FooterView;
