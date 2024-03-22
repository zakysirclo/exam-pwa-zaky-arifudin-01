/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
import { useQuery } from '@apollo/client';
import { createCompareList } from '@core_modules/product/services/graphql';
import { getCompareList, getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { getCookies, setCookies } from '@helper_cookies';
import { localCompare } from '@services/graphql/schema/local';
import { useTranslation } from 'next-i18next';
import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import Typography from '@common_typography';
import ArrowsRightLeftIcon from '@heroicons/react/24/solid/ArrowsRightLeftIcon';
import cx from 'classnames';
import { getLoginInfo } from '@helper_auth';

const ProductCompareIcon = ({
    withLink, WithLinkView, showZeroValue = true, setIsZeroCompare,
}) => {
    const [getProductCompare, { loading, data: compareList }] = getCompareList({
        errorPolicy: 'all',
    });
    const [getUid, { data: dataUid }] = getCustomerUid();
    const { data: dataCompare, client } = useQuery(localCompare);
    const [setCompareList] = createCompareList();
    const { t } = useTranslation();

    const isLogin = getLoginInfo();

    React.useEffect(() => {
        if (!dataCompare && compareList && compareList.compareList !== null) {
            client.writeQuery({
                query: localCompare,
                data: {
                    item_count: compareList.compareList.item_count,
                    items: compareList.compareList.items,
                },
            });
        }
    }, [dataCompare]);

    React.useEffect(() => {
        if (isLogin) {
            getUid();
        }
    }, [isLogin]);

    React.useEffect(() => {
        if (!compareList && !isLogin) {
            const uid = getCookies('uid_product_compare');
            if (uid) {
                getProductCompare({
                    variables: {
                        uid,
                    },
                });
            }
        }
        if (!loading && compareList && compareList.compareList == null && !isLogin) {
            setCompareList({
                variables: {
                    uid: [],
                },
            }).then(async (res) => {
                setCookies('uid_product_compare', res.data.createCompareList.uid);
            });
        }
    }, [compareList, isLogin]);

    React.useEffect(() => {
        if (!compareList && dataUid) {
            if (isLogin) {
                const uid = getCookies('uid_product_compare');
                if (uid && dataUid.customer && dataUid.customer.compare_list && dataUid.customer.compare_list.uid) {
                    const uid_product = dataUid.customer.compare_list.uid;
                    getProductCompare({
                        variables: {
                            uid: uid_product,
                        },
                    });
                }
            }
        }
    }, [compareList, dataUid]);

    useEffect(() => {
        if (setIsZeroCompare) {
            if (!showZeroValue && (!compareList || !compareList.compareList || !compareList.compareList.item_count)) {
                setIsZeroCompare(true);
            } else {
                setIsZeroCompare(false);
            }
        }
    }, [compareList, setIsZeroCompare, showZeroValue]);

    if (!showZeroValue && (!compareList || !compareList.compareList || !compareList.compareList.item_count)) {
        return null;
    }

    if (withLink) {
        let tempCompare = null;
        if (dataCompare && dataCompare.item_count) {
            tempCompare = {
                compareList: {
                    item_count: dataCompare.item_count,
                    items: dataCompare.items,
                },
            };
        }
        return (
            <>
                <WithLinkView compareList={tempCompare || compareList} handleLink="/catalog/product_compare" isLogin={isLogin} />
            </>
        );
    }

    /* eslint-disable */
    if (dataCompare || compareList) {
        return (
            <>
                <Typography variant="bd-2">
                    {t('common:productCompare:title')} (
                    {(dataCompare && dataCompare.item_count) ||
                        (compareList && compareList.compareList && compareList.compareList.item_count && compareList.compareList.item_count) ||
                        0}
                    )
                </Typography>
            </>
        );
    }

    return <ArrowsRightLeftIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />;
    // return null;
    /* eslint-enable */
};

ProductCompareIcon.propTypes = {
    WithLinkView: propTypes.func.isRequired,
};

export default ProductCompareIcon;
