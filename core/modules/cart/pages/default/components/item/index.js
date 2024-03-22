/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
import Typography from '@common_typography';
import ItemProduct from '@core_modules/cart/pages/default/components/item/item';
import TableList from '@core_modules/cart/pages/default/components/item/TableListItem';
import { storeConfigVar } from '@core/services/graphql/cache';
import React from 'react';
import Divider from '@common/Divider';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Button from '@common/Button';

const ItemView = (props) => {
    const { data, t, toggleEditMode, editMode, deleteItem, handleFeed, toggleEditDrawer, currencyCache, ...other } = props;
    const storeConfigLocalStorage = storeConfigVar();
    let cartItemBySeller = {};

    let isMultiSeller = false;
    if (storeConfigLocalStorage) {
        isMultiSeller = storeConfigLocalStorage.enable_oms_multiseller === 1
        || storeConfigLocalStorage.enable_oms_multiseller === '1';
    }

    if (storeConfigLocalStorage && isMultiSeller && data && data.items) {
        const unGroupedData = data.items;
        // eslint-disable-next-line no-shadow, max-len
        const groupData = unGroupedData.reduce((groupData, { SimpleMiniCustomizable, id, note, prices, product, quantity, ...other }) => {
            let item = groupData.find((p) => p.seller_id === product.seller.seller_id);
            if (!item) {
                item = { seller_id: product.seller.seller_id, seller_name: product.seller.seller_name, children: [] };
                groupData.push(item);
            }
            let child = item.children.find((ch) => ch.name === product.name);
            if (!child) {
                child = {
                    SimpleMiniCustomizable,
                    id,
                    note,
                    prices,
                    product,
                    quantity,
                    ...other,
                };
                item.children.push(child);
            }
            return groupData;
        }, []);
        cartItemBySeller = groupData;
    }

    return (
        <>
            <div className="flex flex-col gap-3 desktop:hidden">
                <Typography variant="p-2a">
                    {`${t('cart:itemDetail')} (${data.total_quantity})`}
                </Typography>
                <div className="flex flex-col gap-6">
                    {isMultiSeller &&
                    cartItemBySeller.map((seller, idx) => (
                        <React.Fragment key={idx}>
                            <div className="bg-neutral-100 p-2">
                                <Typography variant="bd-2a" color="!text-primary">
                                    <span>{seller.seller_name ? seller.seller_name : 'Default Store'}</span>
                                </Typography>
                            </div>
                            {seller.children.map((item, index) => (
                                <ItemProduct
                                    cartItemId={item.id}
                                    key={index}
                                    t={t}
                                    editMode={editMode}
                                    toggleEditDrawer={() =>
                                        toggleEditDrawer({
                                            id: item.id,
                                            quantity: item.quantity,
                                            product_name: item.product.name,
                                        })
                                    }
                                    deleteItem={deleteItem}
                                    handleFeed={handleFeed}
                                    currencyCache={currencyCache}
                                    isMultiSeller={isMultiSeller}
                                    {...other}
                                    {...item}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                    {!isMultiSeller &&
                    data.items.map((item, idx) => (
                        <React.Fragment key={idx}>
                            <ItemProduct
                                cartItemId={item.id}
                                t={t}
                                editMode={editMode}
                                toggleEditDrawer={() =>
                                    toggleEditDrawer({
                                        id: item.id,
                                        quantity: item.quantity,
                                        product_name: item.product.name,
                                    })
                                }
                                deleteItem={deleteItem}
                                handleFeed={handleFeed}
                                currencyCache={currencyCache}
                                {...other}
                                {...item}
                            />
                            <Divider />
                        </React.Fragment>
                    ))}

                    <Button
                        icon={<ChevronRightIcon />}
                        iconPosition="right"
                        variant="plain"
                        link="/"
                        className="!p-0 group"
                        classNameText="!text-primary"
                        iconProps={{ className: 'w-[18px] h-[18px]' }}
                    >
                        {t('common:button:continueShopping')}
                    </Button>
                </div>

            </div>
            <div className="hidden desktop:flex flex-col gap-8">
                <TableList
                    dataCart={data}
                    t={t}
                    deleteItem={deleteItem}
                    handleFeed={handleFeed}
                    toggleEditDrawer={toggleEditDrawer}
                    currencyCache={currencyCache}
                    isMultiSeller={isMultiSeller}
                    {...other}
                />

                <Button
                    icon={<ChevronRightIcon />}
                    iconPosition="right"
                    variant="plain"
                    link="/"
                    className="!p-0 group swift-action-continueshopping"
                    classNameText="!text-primary"
                    iconProps={{ className: 'w-[18px] h-[18px]' }}
                >
                    {t('common:button:continueShopping')}
                </Button>
            </div>
        </>
    );
};

export default ItemView;
