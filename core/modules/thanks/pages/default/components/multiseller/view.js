/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import Button from '@common_button';
import Typography from '@common_typography';
import cx from 'classnames';
import Link from 'next/link';
import propTypes from 'prop-types';
import IconArrow from '@heroicons/react/24/outline/ArrowRightIcon';
import { getLoginInfo } from '@helper_auth';

const ViewThanksMultiSeller = (props) => {
    const {
        t,
        handleContinue,
        customerOrder,
    } = props;

    const isLogin = getLoginInfo();

    return (
        <div className={cx(
            'thanks-pages',
            'w-full flex flex-col gap-3 items-center justify-center',
            'px-5 py-6 desktop:px-20 desktop:py-8',
            'bg-no-repeat bg-cover bg-center',
        )}
        >
            <div className="mt-5 mb-4 flex flex-col items-center justify-center w-full">
                <Typography variant="h1" className="uppercase">
                    {t('thanks:thanks')}
                </Typography>
                <Typography variant="span">
                    {t('thanks:placeInfo')}
                </Typography>
            </div>
            <table class="table-auto my-5">
                <thead>
                    <tr className="hidden desktop:table-row">
                        <th align="left" className="py-1">{`${t('thanks:seller')}`}</th>
                        <th align="left" className="py-1">Order ID</th>
                    </tr>
                </thead>
                <tbody>
                    {customerOrder
                            && customerOrder.length > 0
                            && customerOrder.map((item, key) => (
                                <tr key={key}>
                                    <td className="pr-[20px] py-2 hidden desktop:table-cell">
                                        {item.seller_name ? `${item.seller_name}` : 'Default Seller'}
                                        {item.seller_city ? ` - ${item.seller_city}` : ' - Default City'}
                                    </td>
                                    <td align="right" className="py-2 hidden desktop:table-cell">
                                        {isLogin && isLogin == 1 ? (
                                            (
                                                <Link href={`/sales/order/view/order_id/${item?.order_number}`} passhref>

                                                    <b>{`#${item?.order_number}`}</b>

                                                </Link>
                                            )
                                        ) : (
                                            <b>{`#${item?.order_number}`}</b>
                                        )}
                                    </td>
                                    <td className="table-cell desktop:hidden">
                                        <div className="flex flex-col gap-1 mb-3 border-b border-b-neutral-100">
                                            <div className="grid grid-cols-3 gap-2">
                                                <Typography variant="bd-2">{t('thanks:seller')}</Typography>
                                                <Typography className="col-span-2">
                                                    {item.seller_name ? `${item.seller_name}` : 'Default Seller'}
                                                    {item.seller_city ? ` - ${item.seller_city}` : ' - Default City'}
                                                </Typography>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <Typography variant="bd-2">#Order ID</Typography>
                                                {isLogin && isLogin == 1 ? (
                                                    (
                                                        <Link href={`/sales/order/view/order_id/${item?.order_number}`} passhref>

                                                            <b>{`#${item?.order_number}`}</b>

                                                        </Link>
                                                    )
                                                ) : (
                                                    <b>{`#${item?.order_number}`}</b>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
            <div className="flex flex-col gap-4">
                <Link href="/sales/order/history" passHref legacyBehavior>
                    <Typography variant="bd-3" color="text-primary" className="uppercase cursor-pointer">
                        {t('thanks:orderInfo')}
                    </Typography>
                </Link>
                <Button onClick={handleContinue} endIcon={<IconArrow className="w-4 h-4" />}>
                    <Typography variant="bd-3" color="text-neutral-white" className="uppercase">
                        {t('thanks:continue')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

ViewThanksMultiSeller.propTypes = {
    storeConfig: propTypes.object.isRequired,
    checkoutData: propTypes.object.isRequired,
    t: propTypes.func.isRequired,
    customerOrder: propTypes.array.isRequired,
};

export default ViewThanksMultiSeller;
