/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import cx from 'classnames';

const TableListProduct = (props) => {
    const { data, t, currency, currencyCache } = props;

    return (
        <div className={cx('relative', 'overflow-x-auto')}>
            <table className={cx('mt-[30px]', 'shadow-none', 'w-full', 'border-[1px]', 'border-neutral-400', 'px-4')}>
                <thead>
                    <tr>
                        <th className={cx('px-4', 'py-3', 'text-left')}>
                            <Typography className="text-left font-semibold">{t('common:product:titleProduct')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3', 'text-left')}>
                            <Typography className="text-left font-semibold">SKU</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3', 'text-left')}>
                            <Typography className="text-left font-semibold">{t('common:title:note')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3', 'text-left')}>
                            <Typography className="text-left font-semibold">{t('common:title:price')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3', 'text-left')}>
                            <Typography className="text-left font-semibold">{t('common:title:shortQty')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3', 'text-left')}>
                            <Typography className="text-left font-semibold">{t('common:subtotal')}</Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        <>
                            {data.map((val, index) => (
                                <tr className={cx('mobile:max-tablet:p-2', 'border-t-[1px]', 'border-b-[1px]', 'border-neutral-400')} key={index}>
                                    <td className={cx('px-4', 'py-3', 'text-left')}>
                                        <Typography>{val.name}</Typography>
                                    </td>
                                    <td className={cx('px-4', 'py-3', 'text-left')}>
                                        <Typography>{val.sku}</Typography>
                                    </td>
                                    <td className={cx('px-4', 'py-3', 'text-left')}>
                                        <Typography>{val.note || '-'}</Typography>
                                    </td>
                                    <td className={cx('px-4', 'py-3', 'text-left')}>
                                        <Typography>{formatPrice(val.price_incl_tax, currency, currencyCache)}</Typography>
                                    </td>
                                    <td className={cx('px-4', 'py-3', 'text-left')}>
                                        <Typography>{val.qty_ordered}</Typography>
                                    </td>
                                    <td className={cx('px-4', 'py-3', 'text-left')}>
                                        <Typography>{formatPrice(val.row_total_incl_tax, currency, currencyCache)}</Typography>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : null}
                </tbody>
            </table>
        </div>
    );
};

export default TableListProduct;
