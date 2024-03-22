import Button from '@common/Button';
import React, { useCallback, useEffect, useState } from 'react';
import GridIcon from '@heroicons/react/24/outline/Squares2X2Icon';
import ListIcon from '@heroicons/react/24/outline/Bars3BottomLeftIcon';
import FilterIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import Typography from '@common/Typography';
import cx from 'classnames';
import dynamic from 'next/dynamic';

import ProductItem from '@plugin_productitem';
import PaginationSection from '@plugin_productlist/components/PaginationSection';
import CircularProgress from '@common/CircularProgress';
import Show from '@common_show';
import DrawerFilter from '@common_drawer';

import { getLocalStorage, setLocalStorage } from '@core/helpers/localstorage';

import Sorting from '@plugin_productlist/components/Shorting';
import ProductListSkeleton from '@plugin_productlist/components/ProductListSkeleton';

const Filter = dynamic(() => import('@plugin_productlist/components/Filter'));

const ViewProductList = (props) => {
    const {
        loading, loadmore, products, categoryPath, price, loadPrice,
        handleLoadMore, isPagination, renderEmptyMessage,
        customFilter, aggregations, defaultSort, query, setFiltervalue,
        config, onChangeCategory, dataTabs, onChangeTabs, page,
        ...other
    } = props;

    const { t, storeConfig } = props;

    const [isGrid, setIsGrid] = useState(true);
    const handleSetGrid = (grid) => {
        setLocalStorage('isGrid', grid);
        setIsGrid(!isGrid);
    };

    const [openDrawerFilter, setOpenDrawerFilter] = useState(false);
    const handleOpenDrawerFilter = () => setOpenDrawerFilter(true);
    const handleCloseDrawetFilter = () => setOpenDrawerFilter(false);

    // Load More (Infinite Loop)
    const [isExceedingOffset, setIsExceedingOffset] = useState(false);
    const handleScroll = useCallback(() => {
        // To get page offset of last user
        // const lastUserLoaded = document.querySelector(`.grid-item:last-child`);
        if (!isPagination) {
            const lastUserLoaded = document.querySelector('.latest-product-indicator');
            if (lastUserLoaded) {
                const lastUserLoadedOffset = lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
                const pageOffset = window.pageYOffset + window.innerHeight;

                if (pageOffset > lastUserLoadedOffset) {
                    setIsExceedingOffset(true);
                } else {
                    setIsExceedingOffset(false);
                }
            }
        }
    }, [isPagination]);

    React.useEffect(() => {
        if (isExceedingOffset && !loadmore && !isPagination && products.items.length < products.total_count) {
            handleLoadMore();
        }
    }, [isExceedingOffset]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const gridView = getLocalStorage('isGrid');
        if (gridView !== null) {
            setIsGrid(typeof gridView === 'boolean' ? gridView : JSON.parse(gridView));
        }
    }, [isGrid]);

    const loadList = isPagination ? (loadmore || loading) : loading;

    const checkEmpty = products.items.length === 0;

    return (
        <div className="flex flex-row gap-4 desktop:gap-6 w-full">
            <DrawerFilter
                open={openDrawerFilter}
                handleClose={handleCloseDrawetFilter}
                className="z-dialog"
            >
                <div className="px-6 py-4 flex flex-col">
                    <div className="mb-5 min-h-[36px] border-neutral-100 border-b-[1px] flex items-center justify-between pb-3">
                        <Typography variant="h3" className="text-base font-semibold basis-full">
                            {t('catalog:filter:title')}
                        </Typography>
                        <Button
                            iconOnly
                            icon={<XMarkIcon />}
                            variant="tertiary"
                            onClick={handleCloseDrawetFilter}
                            iconProps={{ className: '!text-neutral-900' }}
                            className="!p-0"
                        />
                    </div>
                    <Show when={openDrawerFilter}>
                        <Filter
                            filter={customFilter || aggregations}
                            defaultSort={JSON.stringify(defaultSort)}
                            filterValue={query}
                            setFiltervalue={setFiltervalue}
                            isSearch={!!config.search}
                            products={products}
                            renderEmptyMessage={renderEmptyMessage}
                            loading={loading}
                            tabs={dataTabs}
                            t={t}
                            onChangeTabs={onChangeTabs}
                            storeConfig={storeConfig}
                            autoReload={false}
                            onSave={handleCloseDrawetFilter}
                        />
                    </Show>
                </div>
            </DrawerFilter>
            <Show when={loading}>
                <div className="hidden desktop:inline-flex flex-col w-full desktop:max-w-[282px]">
                    <div className="w-full bg-neutral-100 h-screen" />
                </div>
            </Show>
            <Show when={!checkEmpty && !loading}>
                <div className="swift-filter-container hidden desktop:inline-flex flex-col w-full desktop:max-w-[282px]">
                    <div className="mb-5 h-[36px] border-neutral-100 border-b-[1px]">
                        <Typography variant="h3" className="text-base basis-full capitalize">
                            {t('catalog:filter:title')}
                        </Typography>
                    </div>
                    <div className="swift-filter-content w-fullh-screen">
                        <Filter
                            filter={customFilter || aggregations}
                            defaultSort={JSON.stringify(defaultSort)}
                            filterValue={query}
                            setFiltervalue={setFiltervalue}
                            isSearch={!!config.search}
                            products={products}
                            renderEmptyMessage={renderEmptyMessage}
                            loading={loading}
                            tabs={dataTabs}
                            t={t}
                            onChangeTabs={onChangeTabs}
                            storeConfig={storeConfig}
                            scrollContent={false}
                            autoReload
                        />
                    </div>
                </div>
            </Show>
            <div className="basis-full w-full desktop:max-w-[895px] flex flex-col">
                <Show when={!checkEmpty && !loading}>
                    <div className="flex flex-row items-center align-middle justify-between mb-5">
                        <div className="flex flex-row items-center gap-2">
                            <div className={cx(
                                'px-3 py-2 bg-neutral-white flex flex-row gap-3 items-center',
                                'border rounded-md border-neutral-200',
                                'h-max w-max desktop:hidden',
                            )}
                            >
                                <Button
                                    variant="plain"
                                    icon={<FilterIcon />}
                                    iconPosition="left"
                                    iconProps={{
                                        className: 'w-[20px] h-[20px]',
                                    }}
                                    className={cx(
                                        '!p-0',
                                    )}
                                    classNameText="text-neutral"
                                    onClick={handleOpenDrawerFilter}
                                >
                                    <Typography className="font-semibold tex-md text-neutral">
                                        Filter
                                    </Typography>
                                </Button>
                            </div>
                            <div className={cx(
                                'swift-view-mode-container px-3 py-2 bg-neutral-white flex flex-row gap-3 items-center',
                                'border rounded-md border-neutral-200',
                                'h-max w-max',
                            )}
                            >
                                <div className="hidden tablet:flex">
                                    <Typography className="font-semibold tex-md text-neutral">
                                        {t('catalog:filter:viewAs')}
                                    </Typography>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="plain"
                                        iconOnly
                                        icon={<ListIcon />}
                                        iconProps={{
                                            className: !isGrid
                                                ? 'w-[20px] h-[20px] text-neutral-600'
                                                : 'w-[20px] h-[20px] text-neutral-400 hover:text-primary',
                                        }}
                                        className="swift-view-mode-list !p-0"
                                        onClick={() => handleSetGrid(false)}
                                    />
                                    <Button
                                        variant="plain"
                                        iconOnly
                                        icon={<GridIcon />}
                                        iconProps={{
                                            className: isGrid
                                                ? 'w-[20px] h-[20px] text-neutral-600'
                                                : 'w-[20px] h-[20px] text-neutral-400 hover:text-primary',
                                        }}
                                        className="swift-view-mode-grid !p-0"
                                        onClick={() => handleSetGrid(true)}
                                    />
                                </div>
                            </div>
                        </div>
                        <Sorting
                            filter={customFilter || aggregations}
                            defaultSort={JSON.stringify(defaultSort)}
                            filterValue={query}
                            setFiltervalue={setFiltervalue}
                            isSearch={!!config.search}
                            t={t}
                        />
                    </div>
                </Show>
                <div className={
                    cx(
                        'swift-product-list',
                        isGrid
                            ? 'grid gap-2 tablet:gap-4 grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3'
                            : 'grid grid-cols-1 gap-[10px] tablet:gap-10',
                    )
                }
                >
                    <Show when={loading}>
                        <ProductListSkeleton isGrid={isGrid} />
                    </Show>
                    {
                        !loadList && products.items && products.items.map((item, key) => (
                            <div
                                className="w-auto h-auto swift-item-product-container"
                                key={key}
                            >
                                <ProductItem
                                    categorySelect={categoryPath}
                                    isGrid={isGrid}
                                    catalogList
                                    price={price}
                                    loadPrice={loadPrice}
                                    preloadImage={false}
                                    {...other}
                                    {...item}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="latest-product-indicator" />

                {checkEmpty
                    ? renderEmptyMessage(products.items.length, loading)
                    : null}
                <Show when={loadmore}>
                    <div className={cx(
                        'w-full p-5 flex justify-center',
                    )}
                    >
                        <div className="flex flex-row">
                            <CircularProgress size="small" className="mr-2" />
                            <Typography varaint="bd-2" color="text-neutral">
                                Loading...
                            </Typography>
                        </div>
                    </div>
                </Show>

                { isPagination && <PaginationSection {...props} /> }
            </div>
        </div>
    );
};

export default ViewProductList;
