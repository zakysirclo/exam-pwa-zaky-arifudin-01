/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import cx from 'classnames';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import Button from '@common_button';
import Typography from '@common_typography';
import useMediaQuery from '@core/hooks/useMediaQuery';

const SwitcherLanguage = dynamic(() => import('@core_modules/theme/components/header/components/burgermenu/account/plugins/language/index'), {
    ssr: false,
});
const SwitcherCurrency = dynamic(() => import('@core_modules/theme/components/header/components/burgermenu/account/plugins/currency/index'), {
    ssr: false,
});

const BurgerMenuAccount = (props) => {
    const { isLogin, handleLogout } = props;

    const [switcherContentActive, setSwitcherContentActive] = React.useState(false);
    const [SwitcherContent, setSwitcherContent] = React.useState(null);
    const { isMobile } = useMediaQuery();

    return (
        <div>
            {!switcherContentActive && (
                <>
                    <div className={cx('p-4')}>
                        <div
                            className={cx('grid', 'grid-cols-1', 'pb-4', {
                                'border-b-[1px] border-neutral-300': isLogin || (isMobile && !isLogin),
                            })}
                        >
                            {isLogin ? (
                                <>
                                    <Link className={cx('py-3', 'px-4')} href="/customer/account" prefetch={false}>
                                        <Typography>My Account</Typography>
                                    </Link>
                                    <Link className={cx('py-3', 'px-4')} href="/wishlist" prefetch={false}>
                                        <Typography>My Wishlist</Typography>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link className={cx('py-3', 'px-4', 'swift-login-register-link')} href="/customer/account/login" prefetch={false}>
                                        <Typography>Log in / Register</Typography>
                                    </Link>
                                </>
                            )}
                            <Link className={cx('py-3', 'px-4')} href="/catalog/product_compare" prefetch={false}>
                                <Typography>Compare Products</Typography>
                            </Link>
                            {isLogin ? (
                                <Button
                                    className={cx(
                                        '!px-4',
                                        '!py-3',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={handleLogout}
                                    variant="tertiary"
                                    classNameText={cx('!text-red-500')}
                                >
                                    <Typography className={cx('text-red-500')}>Log Out</Typography>
                                </Button>
                            ) : null}
                        </div>
                        {isMobile ? (
                            <div className={cx('grid', 'grid-cols-1')}>
                                <SwitcherCurrency
                                    switcherContentActive={switcherContentActive}
                                    setSwitcherContentActive={setSwitcherContentActive}
                                    switcherContent={SwitcherContent}
                                    setSwitcherContent={setSwitcherContent}
                                    {...props}
                                />
                                <SwitcherLanguage
                                    switcherContentActive={switcherContentActive}
                                    setSwitcherContentActive={setSwitcherContentActive}
                                    switcherContent={SwitcherContent}
                                    setSwitcherContent={setSwitcherContent}
                                    {...props}
                                />
                            </div>
                        ) : null}
                        <div className={cx('py-6', 'px-4')} />
                    </div>
                </>
            )}
            {switcherContentActive && SwitcherContent && <div className={cx('px-4')}>{React.cloneElement(SwitcherContent)}</div>}
        </div>
    );
};

export default BurgerMenuAccount;
