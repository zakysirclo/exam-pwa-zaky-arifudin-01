/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable radix */
import React from 'react';
import Image from '@common_image';
import Typography from '@common_typography';
import Link from 'next/link';
import { formatPrice } from '@helper_currency';
import ButtonQty from '@common/ButtonQty';
import Show from '@common/Show';
import Button from '@common/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import Badge from '@common/Badge';
import OrderNote from '@core_modules/cart/pages/default/components/item/OrderNote';

const TableItem = (props) => {
    const {
        customizable_options, SimpleMiniCustomizable, ConfigurableMiniCustomizable,
        product, storeConfig, custom_price, configurable_options, links, bundle_options,
        currencyCache, quantity, updateItem, id, confirmDelete, isMultiSeller, t, note,
        aw_giftcard_option,
    } = props;

    const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 10);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 10);

    return (
        <tr className="border-b-[1px] border-b-neutral-200">
            <td align="left" valign="top" className="py-4">
                <div className="grid grid-cols-3">
                    <div className="w-[120px] h-[120px] overflow-hidden justify-center items-center rounded-lg relative">
                        <Link
                            href="/[...slug]"
                            as={`/${product.url_key}`}
                            className="swift-product-item-photo justify-center items-center overflow-hidden"
                        >
                            <Image
                                src={product.small_image.url}
                                className="!w-[120px] !h-[120px]"
                                classContainer="!w-[120px] !h-[120px]"
                                alt={product.name}
                                width={defaultWidth}
                                height={defaultHeight}
                                quality={80}
                                storeConfig={storeConfig}
                            />
                        </Link>
                        {custom_price.price_incl_tax.value === 0 ? (
                            <Badge fontSize={10} success label={t('common:title:free')} className="z-3 absolute top-1 left-1" />
                        ) : null}
                    </div>
                    <div className="flex flex-col px-4 col-span-2">
                        <div className="flex flex-col gap-2">
                            <Link href="/[...slug]" as={`/${product.url_key}`} className="swift-product-item-name">
                                <Typography variant="bd-2b" className="!text-base font-normal line-clamp-2 capitalize">
                                    {product.name}
                                </Typography>
                            </Link>
                            <Show when={configurable_options && configurable_options.length && configurable_options.length > 0}>
                                <Typography variant="bd-2b" letter="capitalize" className="font-normal">
                                    {
                                        configurable_options && configurable_options.map((item, idx) => (
                                            `${item.value_label}${idx < configurable_options.length - 1 ? ', ' : ''}`
                                        ))
                                    }
                                </Typography>
                            </Show>
                        </div>
                        <div className="flex flex-row mt-1">
                            {links && links.length > 0 && (
                                <div className="xs:basis-full flex flex-row gap-1">
                                    <Typography variant="bd-2b" letter="capitalize" type="bold">
                                        Downloads :
                                    </Typography>
                                    <div className="flex flex-col gap-1">
                                        {links.map((item, idx) => (
                                            <Typography variant="bd-2b" letter="capitalize" key={idx}>
                                                {item.title}
                                            </Typography>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {bundle_options && bundle_options.length ? (
                            <div className="flex flex-col mt-1 gap-2">
                                {bundle_options.map((value, idx) => (
                                    <div className="flex flex-col" key={idx}>
                                        <Typography variant="bd-2b">{value.label}</Typography>
                                        <div className="flex flex-col">
                                            {value.values.map((item, idt) => (
                                                <Typography variant="bd-2b" key={idt}>
                                                    <span className="plugin-tableCart-itemQty">{item.quantity}</span>
                                                    {' '}
                                                    x
                                                    {item.label}
                                                    {' '}
                                                    +
                                                    {' '}
                                                    {formatPrice(item.price, 'IDR', currencyCache)}
                                                </Typography>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        {cartCustomOptions && cartCustomOptions.length ? (
                            <div className="flex flex-col gap-1 mt-1">
                                {cartCustomOptions.map((op, idx) => (
                                    <div className="option-wrapper" key={idx}>
                                        <Typography className="flex flex-row option-wrapper__item">
                                            {`${op.label}: `}
                                            {op.values.map((item, idt) => (
                                                <p key={idt} className="option-item ml-1">
                                                    {item.label && item.label !== '' ? item.label : item.value}
                                                </p>
                                            ))}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        {aw_giftcard_option && aw_giftcard_option.length ? (
                            <div className="flex flex-col gap-3 mt-1">
                                {aw_giftcard_option.map((val, idx) => (
                                    <div className="flex flex-col" key={idx}>
                                        <Typography variant="bd-1b">
                                            {`${val.label} : `}
                                        </Typography>

                                        <Typography variant="bd-1b">
                                            {val.value}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <Show when={isMultiSeller}>
                            <div className="order-note mt-2">
                                <OrderNote cartItemId={id} note={note} quantity={quantity} />
                            </div>
                        </Show>
                    </div>
                </div>
            </td>
            <td align="center" valign="top" className="py-4 px-14">
                <ButtonQty
                    value={quantity}
                    onChange={(newQty, trigger) => {
                        // only update item if user change qty via +- button
                        if (trigger === 'button') {
                            updateItem({
                                cart_item_id: id,
                                quantity: newQty,
                            });
                        }
                    }}
                    onBlur={(newQty) => {
                        updateItem({
                            cart_item_id: id,
                            quantity: newQty,
                        });
                    }}
                    max={10000}
                />
            </td>
            <td align="right" valign="top" className="py-4">
                <div className="flex flex-col justify-between h-[150px]">
                    <Typography className="!text-base font-medium">
                        {custom_price.price_incl_tax.value === 0
                            ? t('common:title:free')
                            : formatPrice(
                                custom_price.row_total_incl_tax.value,
                                custom_price.row_total_incl_tax.currency,
                                currencyCache,
                            )}
                    </Typography>
                    <Button
                        iconOnly
                        className="!px-0 !py-4 swift-cart-tableCart-removeCartBtn"
                        iconPosition="right"
                        icon={<TrashIcon />}
                        variant="plain"
                        onClick={() => confirmDelete(props)}
                    />
                </div>
            </td>
        </tr>
    );
};

export default TableItem;
