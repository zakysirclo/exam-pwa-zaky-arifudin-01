/* eslint-disable no-plusplus */
import React from 'react';
import { getCategoryByName } from '@core_modules/searchresult/services/graphql/index';
import CategoryItem from '@core_modules/searchresult/components/CategoryList/view';
import Show from '@common/Show';

const categoryList = (props) => {
    const { q } = props;

    const [noOfElement, setnoOfElement] = React.useState(4);
    const loadMore = () => {
        setnoOfElement(noOfElement + noOfElement);
    };

    const generateItemData = (category) => {
        const result = [];
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
        return result;
    };

    const { data, loading } = getCategoryByName({ name: q });

    let itemData = [];
    let slice = [];

    if (data) {
        itemData = generateItemData(data.categoryList);
    }

    if (itemData && itemData.length > 0) {
        slice = itemData.slice(0, noOfElement);
    }

    return (
        <Show when={itemData && itemData.length > 0}>
            <CategoryItem {...props} data={itemData} slice={slice} loadMore={loadMore} loading={loading} />
        </Show>
    );
};

export default categoryList;
