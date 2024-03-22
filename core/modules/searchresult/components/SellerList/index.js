/* eslint-disable no-plusplus */
import React from 'react';
import { getSeller } from '@core_modules/searchresult/services/graphql/index';
import SellerItem from '@core_modules/searchresult/components/SellerList/view';
import Skeleton from '@core_modules/searchresult/components/SellerList/skeleton';

const sellerList = (props) => {
    const { q } = props;
    const { data, loading } = getSeller({
        fetchPolicy: 'no-cache',
        variables: {
            input: {
                keyword: q,
            },
        },
    });

    const generateItemData = (seller) => {
        const result = [];
        for (let index = 0; index < seller?.length; index++) {
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
                type: 'seller',
            };
            result.push(sell);
        }
        return result;
    };

    let itemData = [];

    if (data && data.getSeller.length > 0) {
        itemData = generateItemData(data.getSeller);
    }

    if (loading) {
        return (
            <div className="flex flex-row gap-4 flex-wrap">
                {
                    [1, 2].map((key) => (
                        <Skeleton key={key} />
                    ))
                }
            </div>
        );
    }

    return (
        <>
            {itemData && itemData.length > 0 ? (
                <SellerItem {...props} data={itemData} loading={loading} />
            ) : null}
        </>
    );
};

export default sellerList;
