/* eslint-disable operator-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
import Carousel from '@common_slick/Caraousel';
import SkeletonWidget from '@common_slick/Caraousel/Skeleton';
import { generateQueries, getProductListConditions } from '@core_modules/cms/helpers/getProductListConditions';
import { getProductList } from '@core_modules/cms/services/graphql';
import ProductItem from '@plugin_productitem';
import ErrorMessage from '@plugin_productlist/components/ErrorMessage';
import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

/**
 * [CONSTANT] variable
 */
const TEMPLATE_SLIDER = 'slider';
const TEMPLATE_GRID = 'grid';

const WidgetListProduct = (props) => {
    const {
        template, products_count, conditions_encoded, storeConfig,
    } = props;
    const { t } = useTranslation();

    /**
     * [QUERY] query for products items
     */
    const dataConditions = useMemo(() => getProductListConditions(conditions_encoded), [conditions_encoded]);
    const dataFilter = generateQueries(template, dataConditions);
    const [fetchProductList, { data, loading, error }] = getProductList();
    const dataItems = data?.products?.items || [];

    React.useEffect(() => {
        fetchProductList({
            variables: { ...dataFilter, pageSize: parseInt(products_count, 10) },
        });
    }, []);

    /**
     * [TEMPLATE] type slider
     */
    const classSkeleton = 'full-width widget-product-list-skeleton';
    const classProductList = 'full-width widget-product-list';
    if (loading) {
        return (
            <div className={classSkeleton}>
                <SkeletonWidget />
            </div>
        );
    }

    if (error) {
        return (
            <>
                <div className="mgz-product-error">
                    <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />
                </div>
            </>
        );
    }

    if (template === TEMPLATE_SLIDER && !loading && dataItems?.length > 0) {
        return (
            <>
                <div className={classProductList}>
                    <Carousel enableQuickView={false} data={dataItems} Item={ProductItem} storeConfig={storeConfig} />
                </div>
            </>
        );
    }

    /**
     * [TEMPLATE] type grid
     */
    if (template === TEMPLATE_GRID && !loading && dataItems?.length > 0) {
        return (
            <>
                <div className={classProductList}>
                    <div className="flex gap-4 flex-wrap">
                        {dataItems?.length > 0 &&
                            dataItems.map((item, key) => (
                                <div className="!max-w-[288px]" key={key}>
                                    <ProductItem
                                        isGrid
                                        storeConfig={storeConfig}
                                        t={t}
                                        {...item}
                                        imageProps={{
                                            className: 'desktop:!w-64 desktop:!h-64',
                                            classContainer: 'desktop:!w-64 desktop:!h-64',
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </>
        );
    }

    return <SkeletonWidget />;
};

export default WidgetListProduct;
