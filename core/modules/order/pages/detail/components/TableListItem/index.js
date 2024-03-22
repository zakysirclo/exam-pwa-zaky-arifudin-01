/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Image from '@common_image';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import cx from 'classnames';
import { basePath } from '@config';

const MobileTableItemComponent = ({ label, value }) => (
    <div className={cx('flex flex-row')}>
        <div className="w-[35%]">
            <Typography type="bold">{label}</Typography>
        </div>
        <div className="w-[5%]">
            <Typography>{' : '}</Typography>
        </div>
        <div className="w-[60%]">
            <Typography>{value}</Typography>
        </div>
    </div>
);

const TableListProduct = (props) => {
    const { data, t, currency, currencyCache } = props;

    return (
        <div className={cx('relative', 'overflow-x-auto')}>
            <div className={cx('tablet:hidden', 'flex', 'flex-col', 'gap-y-4', 'py-4')}>
                {data &&
                    data.map((product, index) => (
                        <div
                            className={cx(
                                'product-wrapper',
                                'grid',
                                'mobile:max-[511px]:grid-cols-1',
                                'mobile:max-[511px]:gap-y-2',
                                'min-[512px]:grid-cols-[4fr_8fr]',
                                'bg-neutral-50',
                                'p-4',
                                'rounded-lg',
                            )}
                            key={index}
                        >
                            <div className={cx('product-image', 'h-[100px]', 'w-[100px]', 'mt-[5px]', 'mb-[5px]', 'mr-[5px]')}>
                                <Image
                                    src={product.image_url || `${basePath}/assets/img/placeholder.png`}
                                    width={100}
                                    height={100}
                                    alt={product.name}
                                    storeConfig={props?.storeConfig}
                                />
                            </div>
                            <div className={cx('product-info', 'flex', 'flex-col', 'justify-center')}>
                                <MobileTableItemComponent label={t('common:product:titleProduct')} value={product.name} />
                                <MobileTableItemComponent label={t('common:title:sku')} value={product.sku} />
                                <MobileTableItemComponent label={t('common:title:note')} value={product.note ?? '-'} />
                                <MobileTableItemComponent
                                    label={t('common:title:price')}
                                    value={formatPrice(product.price_incl_tax, currency, currencyCache)}
                                />
                                <MobileTableItemComponent label={t('common:title:shortQty')} value={product.qty_ordered} />
                                <MobileTableItemComponent
                                    label={t('common:subtotal')}
                                    value={formatPrice(product.row_total_incl_tax, currency, currencyCache)}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <table className={cx('mobile:max-tablet:hidden', 'mt-[30px]', 'shadow-none', 'w-full', 'border-[1px]', 'border-neutral-100')}>
                <thead>
                    <tr>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">#</Typography>
                        </th>
                        <th className={cx('py-3', 'text-left')}>
                            <Typography type="bold">{t('common:product:titleProduct')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">SKU</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:title:note')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:title:price')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:title:shortQty')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:subtotal')}</Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        <>
                            {data.map((val, index) => (
                                <tr
                                    className={cx(
                                        'mobile:max-tablet:grid',
                                        'mobile:max-tablet:border-b-[1px]',
                                        'mobile:max-tablet:border-b-neutral-200',
                                        'mobile:max-tablet:p-2',
                                        'even:bg-white',
                                        'odd:bg-neutral-50',
                                    )}
                                    key={index}
                                >
                                    <td>
                                        <div className={cx('h-[100px]', 'w-[100px]', 'mt-[5px]', 'mb-[5px]', 'mr-[5px]')}>
                                            <Image
                                                src={val.image_url || `${basePath}/assets/img/placeholder.png`}
                                                width={100}
                                                height={100}
                                                alt={val.name}
                                                storeConfig={props?.storeConfig}
                                            />
                                        </div>
                                    </td>
                                    <td className="tablet:text-left px-[5px]">
                                        <Typography>{val.name}</Typography>
                                    </td>
                                    <td className="tablet:text-left px-[5px]">
                                        <Typography>{val.sku}</Typography>
                                    </td>
                                    <td className="tablet:text-left px-[5px]">
                                        <Typography>{val.note ?? '-'}</Typography>
                                    </td>
                                    <td className="tablet:text-left px-[5px]">
                                        <Typography>{formatPrice(val.price_incl_tax, currency, currencyCache)}</Typography>
                                    </td>
                                    <td className="tablet:text-center px-[5px]">
                                        <Typography>{val.qty_ordered}</Typography>
                                    </td>
                                    <td className="tablet:text-left px-[5px]">
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
