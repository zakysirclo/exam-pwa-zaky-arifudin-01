/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import { getCategoryByName, getProduct, getSellerByName } from '@core_modules/theme/services/graphql';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import React from 'react';

import TextField from '@common_forms/TextField';
import Popover from '@common_popover';
import PriceFormat from '@common_priceformat';

import Image from '@common_image';

import Magnify from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import Typography from '@common/Typography';

let globalTimeout = null;

const generateItemData = (product, category, seller, enableMultiseller) => {
    const result = [];
    for (let index = 0; index < product.items.length; index++) {
        const element = product.items[index];
        const prod = {
            id: element.id,
            name: element.name,
            seller_name: enableMultiseller ? element?.seller?.seller_name : '',
            url_key: element.url_key,
            position: index,
            small_image: element.small_image,
            price_tiers: element.price_tiers,
            price_range: element.price_range,
            type: 'product',
            product_type: element.__typename,
        };
        result.push(prod);
    }
    for (let index = 0; index < category.length; index++) {
        const element = category[index];
        const cat = {
            id: element.id,
            name: element.name,
            url_key: element.url_path,
            breadcrumbs: element.breadcrumbs,
            position: index,
            type: 'category',
        };
        result.push(cat);
    }
    if (enableMultiseller) {
        for (let index = 0; index < seller.length; index++) {
            const element = seller[index];
            const sell = {
                additional_info: element.additional_info,
                city: element.city,
                address: element.address,
                description: element.description,
                id: element.id,
                latitude: element.latitude,
                logo: element.logo,
                longitude: element.longitude,
                name: element.name,
                status: element.status,
                position: index,
                seller_path: element.seller_path,
                type: 'seller',
            };
            result.push(sell);
        }
    }
    return result;
};

export default function AutocompleteSearch(props) {
    const { placeholder, handleSearch, storeConfig, popoverProps = {}, textfieldProps = {} } = props;
    const { t } = useTranslation(['common']);
    const [item, setItem] = React.useState(null);
    const [isShow, setIsShow] = React.useState(false);
    const [searchKeyword, setSearchKeyword] = React.useState('');

    const enableMultiseller = storeConfig.enable_oms_multiseller === '1' || storeConfig.enable_oms_multiseller === 1;

    const [actGetProduct, { loading, data, called }] = getProduct(searchKeyword);
    const [actGetCategory, { data: dCategory, loading: lCategory, called: cCategory }] = getCategoryByName(searchKeyword);
    const [actGetSeller, { data: dSeller, loading: lSeller, called: cSeller }] = getSellerByName(searchKeyword);

    const inputRef = React.useRef(null);

    React.useEffect(() => {
        if (enableMultiseller && data && dCategory && dSeller && !loading && !lCategory && !lSeller) {
            setItem(generateItemData(data.products, dCategory.categoryList, dSeller.getSeller, enableMultiseller));
        } else if (!enableMultiseller && data && dCategory && !loading && !lCategory) {
            setItem(generateItemData(data.products, dCategory.categoryList, enableMultiseller));
        }
    }, [data, dCategory, dSeller, enableMultiseller, loading, lCategory, lSeller]);

    const handleKeyPress = (e) => {
        handleSearch(e);
    };

    const handleAutocomplete = (e) => {
        if (e.target.value === '') {
            setSearchKeyword('');
            setIsShow(false);
            setItem(null);
        } else {
            if (globalTimeout) {
                clearTimeout(globalTimeout);
            }

            globalTimeout = setTimeout(() => {
                if (!loading && !lCategory && !called && !cCategory) {
                    actGetProduct();
                    actGetCategory();

                    if (enableMultiseller) {
                        if (!cSeller) {
                            actGetSeller();
                        }
                    }
                }
            }, 150);
        }
    };

    React.useEffect(() => {
        if (isShow === false) {
            setSearchKeyword('');
            setItem(null);
        }
    }, [isShow]);

    React.useEffect(() => {
        if (item !== null && item.length > 0) {
            setIsShow(true);
        }
    }, [item]);

    const PopoverContent = () => {
        const PopoverItem = (propsPopoverItem, key) => {
            const { name, type, position, small_image, breadcrumbs, logo, city } = propsPopoverItem;

            const handleOnClickItem = (onClickProps) => {
                const { result: resultType, type: typeProps, url_key, seller_path } = onClickProps;
                if (resultType === 'seller' || typeProps === 'seller') {
                    Router.push(`/seller/${seller_path}`);
                } else {
                    Router.push(
                        {
                            pathname: '/[...slug]',
                            query: {},
                        },
                        `/${url_key}`,
                    );
                }
            };

            const citySplit = city?.split(',');
            let breadcrumbsText = '';
            if (breadcrumbs) {
                for (let i = 0; i < breadcrumbs.length; i++) {
                    const element = breadcrumbs[i];
                    breadcrumbsText += `${element.category_name} / `;
                }
            }

            return (
                <>
                    {type === 'product' ? (
                        <>
                            {position === 0 ? (
                                <div className={cx('top-title', 'py-2', 'normal-case', 'font-semibold', 'leading-5', 'text-base')}>Products</div>
                            ) : null}
                            <div
                                className={cx('grid', 'xs:grid-cols-[48px_1fr]', 'gap-x-2', 'py-2', 'hover:bg-neutral-50', 'hover:cursor-pointer')}
                                key={key}
                                onClick={() => handleOnClickItem(propsPopoverItem)}
                                role="presentation"
                            >
                                <div className="image-container">
                                    <Image alt={name} src={small_image.url} width={64} height={64} storeConfig={storeConfig} />
                                </div>
                                <div className={cx('title-search-item', 'text-base', 'normal-case', 'leading-5', 'font-[500]')}>
                                    {name.length > 47 ? `${name.substr(0, 47)}...` : `${name}`}
                                    <br />
                                    <PriceFormat
                                        priceRange={propsPopoverItem.price_range}
                                        priceTiers={propsPopoverItem.price_tier}
                                        textClassName={cx('!text-sm', '!leading-4', '!font-normal', '!text-neutral-500')}
                                        productType={propsPopoverItem.product_type}
                                    />
                                </div>
                            </div>
                        </>
                    ) : null}
                    {type === 'category' ? (
                        <>
                            {position === 0 ? (
                                <div className={cx('top-title', 'py-2', 'normal-case', 'font-semibold', 'leading-5', 'text-base')}>Categories</div>
                            ) : null}
                            <div
                                className={cx('grid', 'py-2', 'hover:bg-neutral-50', 'hover:cursor-pointer')}
                                key={key}
                                onClick={() => handleOnClickItem(propsPopoverItem)}
                                role="presentation"
                            >
                                <div className={cx('breadcrumbs', 'block', 'text-base', 'text-neutral-400')}>
                                    {breadcrumbsText}
                                    <div className="title-category inline-block text-base !text-neutral-600">{name}</div>
                                </div>
                            </div>
                        </>
                    ) : null}
                    {type === 'seller' ? (
                        <>
                            {position === 0 ? (
                                <div className={cx('top-title', 'py-2', 'normal-case', 'font-semibold', 'leading-5', 'text-base')}>Merchants</div>
                            ) : null}
                            <div
                                className={cx('grid', 'gap-x-2', 'py-2', 'hover:bg-neutral-50', 'hover:cursor-pointer')}
                                key={key}
                                onClick={() => handleOnClickItem(propsPopoverItem)}
                                role="presentation"
                            >
                                <div className="flex flex-row gap-4 items-center">
                                    <div className="float-left">
                                        <div className={cx(
                                            'rounded-lg flex items-center justify-center w-[50px] h-[50px]',
                                            'bg-neutral-100 !overflow-hidden',
                                        )}
                                        >
                                            <Image src={logo} width={64} height={64} alt={name} storeConfig={storeConfig} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography variant="bd-2a" className="capitalize !leading-5">
                                            {name}
                                        </Typography>
                                        <Typography variant="bd-3b" className="capitalize">
                                            {citySplit ? citySplit[0] : ''}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </>
            );
        };

        return (
            <div className={cx('px-4')}>
                {isShow && searchKeyword.length !== 0 && (item === null || (typeof item === 'object' && item.length === 0)) ? (
                    <div className={cx('breadcrumbs', 'block', 'text-sm', 'text-neutral-500', 'uppercase', 'py-4')}>{t('common:error:notFound')}</div>
                ) : (
                    item !== null && item.map((items, index) => <PopoverItem key={index} {...items} />)
                )}
            </div>
        );
    };

    return (
        <div className={cx('mobile:max-tablet:mt-2', 'mobile:max-tablet:pb-3', 'flex', 'flex-row', 'justify-center')}>
            <Popover content={<PopoverContent />} open={isShow} setOpen={setIsShow} {...popoverProps}>
                <TextField
                    value={searchKeyword}
                    placeholder={placeholder || t('common:search:title')}
                    onChange={(e) => {
                        setSearchKeyword(e.target.value);
                        handleAutocomplete(e);
                    }}
                    ref={inputRef}
                    rightIcon={searchKeyword === '' ? <Magnify /> : <XMarkIcon />}
                    rightIconProps={{
                        className: cx(
                            'mobile:max-tablet:pr-3',
                            'mobile:max-tablet:w-[40px]',
                            'mobile:max-tablet:h-[44px]',
                            'tablet:max-desktop:w-[42px]',
                            'tablet:max-desktop:h-[44px]',
                            'desktop:w-[42px]',
                            'desktop:h-[46px]',
                            'desktop:p-[10px]',
                            'text-neutral-600',
                            'bg-neutral-100',
                            'rounded-r-lg',
                            'rounded-l-none',
                            'tablet:max-desktop:py-[14px]',
                            'hover:cursor-pointer',
                            'border-b-[1px]',
                            'border-r-[1px]',
                            'border-t-[1px]',
                            'border-neutral-200',
                        ),
                        onClick: () => {
                            setSearchKeyword('');
                            setIsShow(false);
                            setItem(null);
                        },
                    }}
                    onKeyPress={(e) => {
                        handleKeyPress({
                            key: e.key,
                            target: {
                                value: searchKeyword,
                            },
                        });
                    }}
                    className={cx(
                        'mobile:max-tablet:w-[87.5vw]',
                        'tablet:max-desktop:w-[100%]',
                        'tablet:max-desktop:max-w-[480px]',
                        'desktop:w-[560px]',
                        'border-none',
                        textfieldProps?.className || '',
                    )}
                    inputProps={{
                        className:
                            // eslint-disable-next-line max-len
                            cx(
                                'placeholder:text-neutral-400',
                                'bg-neutral-100',
                                'rounded-r-none',
                                'rounded-l-lg',
                                'pl-4',
                                'py-[12px]',
                                'tablet:max-desktop:w-[380px]',
                                'desktop:w-[520px]',
                                'mobile:max-desktop:h-[44px]',
                                'leading-[20px]',
                                'border-t-[1px]',
                                'border-l-[1px]',
                                'border-b-[1px]',
                                'border-neutral-200',
                            ),
                    }}
                />
            </Popover>
        </div>
    );
}
