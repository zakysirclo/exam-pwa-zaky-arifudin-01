import React, { useState } from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import CheckBox from '@common_forms/CheckBox';
import Swatch from '@common_forms/Swatch';
import RadioGroup from '@common_forms/Radio';
import RangeSlider from '@common_rangeslider';

let globalTimeout = null;

const GenerateFilter = (props) => {
    const {
        itemProps = {},
        elastic = false,
        t,
        isSearch,
        selectedFilter,
        setCheckedFilter,
        setSelectedFilter,
        handleSave,
        priceRange,
        setPriceRange,
        itemFilter,
        onChangeTabs,
        idx,
        storeConfig,
        autoReload = true,
        maxPriceRange,
    } = props;
    const timeRef = React.useRef(null);

    const checkedFilter = (field, value) => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }
        setCheckedFilter(field, value);
        if (autoReload) {
            timeRef.current = setTimeout(() => {
                handleSave();
            }, 1000);
        }
    };

    const selectFilter = (field, value) => {
        if (timeRef.current) {
            clearTimeout(globalTimeout);
        }
        setSelectedFilter(field, value);
        if (autoReload) {
            globalTimeout = setTimeout(() => {
                handleSave();
            }, 1000);
        }
    };

    React.useEffect(() =>
        // clear timeout when the component unmounts
        () => clearTimeout(timeRef.current),
    []);

    const ItemValueByLabel = React.useMemo(() => {
        const itemValue = [];
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < itemFilter.value.length; index++) {
            itemValue.push({
                label: itemFilter.value[index].label === '__other_docs'
                    ? t('catalog:filter:others')
                    : itemFilter.value[index].label.replace(/_/g, ' '),
                value: itemFilter.value[index].label,
            });
        }
        return itemValue;
    }, [itemFilter?.value]);

    const [openMore, setOpenMore] = useState(false);

    if (itemFilter.field !== 'attribute_set_id') {
        if (itemFilter.field === 'price') {
            const price = priceRange;
            price[1] = price[1] || parseInt(itemFilter.value[itemFilter.value.length - 1].value, 10);
            return (
                <div key={idx} className="flex flex-col w-full gap-5">
                    <RangeSlider
                        noLabel
                        label={itemFilter.label}
                        maxValue={maxPriceRange}
                        value={price}
                        onChange={itemProps.priceRangeChange || setPriceRange}
                        storeConfig={storeConfig}
                        disableInput
                    />
                    <div className="hidden desktop:flex justify-end">
                        <Button onClick={handleSave}>
                            {t('catalog:button:save')}
                        </Button>
                    </div>
                </div>
            );
        }
        if (itemFilter.field === 'color') {
            let dataColor = ItemValueByLabel.map((item) => ({ ...item, className: 'w-[34px] h-[34px]' }));
            const othersColor = [];
            if (ItemValueByLabel.length > 12) {
                dataColor = [];
                for (let index = 0; index < ItemValueByLabel.length; index += 1) {
                    const colors = {
                        ...ItemValueByLabel[index],
                        className: 'w-[34px] h-[34px]',
                    };
                    if (index < 12) {
                        dataColor.push(colors);
                    } else {
                        othersColor.push(colors);
                    }
                }
            }

            return (
                <div key={idx} className="flex flex-col gap-2">
                    <CheckBox
                        type="color"
                        classNames={{
                            checkboxGroupClasses: '!flex-wrap gap-2',
                        }}
                        name={itemFilter.field}
                        noLabel
                        label={false}
                        data={openMore ? [...dataColor, ...othersColor] : dataColor}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex={itemProps.selectSizeFlex || 'row'}
                        CustomItem={itemProps.selectColorItem || Swatch}
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                    {
                        othersColor.length > 0 && (
                            <Button
                                variant="tertiary"
                                onClick={() => setOpenMore(!openMore)}
                                classNameText="!justify-start"
                                className="swift-action-other-filter-options !p-0 !shadow-none"
                            >
                                <span className="text-neutral-900 hover:text-primary underline capitalize">
                                    {
                                        openMore
                                            ? `- ${t('catalog:filter:lessMore')}`
                                            : `+ ${t('catalog:filter:showMore')}`
                                    }
                                </span>
                            </Button>
                        )
                    }
                </div>
            );
        }
        if (itemFilter.field === 'size') {
            let dataSize = ItemValueByLabel;
            const othersSize = [];
            if (ItemValueByLabel.length > 12) {
                dataSize = [];
                for (let index = 0; index < ItemValueByLabel.length; index += 1) {
                    const colors = ItemValueByLabel[index];
                    if (index < 12) {
                        dataSize.push(colors);
                    } else {
                        othersSize.push(colors);
                    }
                }
            }
            return (
                <div key={idx} className="flex flex-col gap-2">
                    <CheckBox
                        name={itemFilter.field}
                        classNames={{
                            checkboxGroupClasses: '!flex-wrap gap-2',
                        }}
                        noLabel
                        label={false}
                        data={openMore ? [...dataSize, ...othersSize] : dataSize}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex={itemProps.selectSizeFlex || 'row'}
                        CustomItem={itemProps.selectSizeItem || Swatch}
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                    {
                        othersSize.length > 0 && (
                            <Button
                                variant="tertiary"
                                onClick={() => setOpenMore(!openMore)}
                                classNameText="!justify-start"
                                className="swift-action-other-filter-options !p-0 !shadow-none"
                            >
                                <span className="text-neutral-900 hover:text-primary underline capitalize">
                                    {
                                        openMore
                                            ? `- ${t('catalog:filter:lessMore')}`
                                            : `+ ${t('catalog:filter:showMore')}`
                                    }
                                </span>
                            </Button>
                        )
                    }
                </div>
            );
        }
        if ((itemFilter.field === 'cat' || itemFilter.field === 'category_id')) {
            return (
                <div className="flex flex-col gap-2">
                    {itemFilter.value.map((val, ids) => {
                        if (val !== 'attribute_set_id') {
                            return (
                                <button
                                    onClick={(e) => {
                                        if (isSearch) {
                                            selectFilter(itemFilter.field, val.value);
                                        } else {
                                            onChangeTabs(e, ids + 1);
                                        }
                                    }}
                                    className="border-none flex flex-row justify-between items-center"
                                    key={ids}
                                    type="button"
                                >
                                    <Typography className="font-normal" variant="bd-2" letter="capitalize">
                                        {`${val.label.replace(/_/g, ' ')} `}
                                    </Typography>
                                    <Typography className="font-normal" color="text-neutral-400" variant="bd-2" letter="capitalize">
                                        {`(${val.count})`}
                                    </Typography>
                                </button>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        }

        if (itemFilter.field === 'category_uid') return null;

        if (!elastic) {
            let itemFilters = itemFilter.value || [];
            const othersFilters = [];
            if (itemFilter.value.length > 6) {
                itemFilters = [];
                for (let index = 0; index < itemFilter.value.length; index += 1) {
                    const item = itemFilter.value[index];
                    if (index < 6) {
                        itemFilters.push(item);
                    } else {
                        othersFilters.push(item);
                    }
                }
            }

            return (
                <div className="flex flex-col gap-2">
                    <RadioGroup
                        noLabel
                        name={itemFilter.field.replace(/_/g, ' ')}
                        label={false}
                        data={!openMore ? itemFilters : [...itemFilters, ...othersFilters]}
                        value={selectedFilter[itemFilter.field]}
                        onChange={(value) => selectFilter(itemFilter.field, value)}
                        className="!mb-0"
                        classNames={{
                            radioGroupClasses: 'gap-2',
                        }}
                    />

                    {
                        othersFilters.length > 0 && (
                            <Button
                                variant="tertiary"
                                onClick={() => setOpenMore(!openMore)}
                                classNameText="!justify-start"
                                className="swift-action-other-filter-options !p-0 !shadow-none"
                            >
                                <span className="text-neutral-900 hover:text-primary underline capitalize">
                                    {
                                        openMore
                                            ? `- ${t('catalog:filter:lessMore')}`
                                            : `+ ${t('catalog:filter:showMore')}`
                                    }
                                </span>
                            </Button>
                        )
                    }
                </div>
            );
        }

        let itemFilters = itemFilter.value || [];

        const othersFilters = [];

        if (itemFilter.value && itemFilter.value.length > 6) {
            itemFilters = [];
            for (let index = 0; index < itemFilter.value.length; index += 1) {
                const item = itemFilter.value[index];
                if (index < 6) {
                    itemFilters.push(item);
                } else {
                    othersFilters.push(item);
                }
            }
        }
        return (
            <div key={idx} className="flex flex-col gap-2">
                <RadioGroup
                    noLabel
                    name={itemFilter.field.replace(/_/g, ' ')}
                    label={false}
                    data={openMore ? [...itemFilters, ...othersFilters] : itemFilters}
                    value={selectedFilter[itemFilter.field]}
                    onChange={(value) => selectFilter(itemFilter.field, value)}
                    className="flex-row !mb-0"
                    classNames={{
                        radioGroupClasses: 'gap-2',
                    }}
                />
                {
                    othersFilters.length > 0 && (
                        <Button
                            variant="tertiary"
                            onClick={() => setOpenMore(!openMore)}
                            classNameText="!justify-start"
                            className="swift-action-other-filter-options !p-0 !shadow-none"
                        >
                            <span className="text-neutral-900 hover:text-primary underline capitalize">
                                {
                                    openMore
                                        ? `- ${t('catalog:filter:lessMore')}`
                                        : `+ ${t('catalog:filter:showMore')}`
                                }
                            </span>
                        </Button>
                    )
                }
            </div>
        );
    }
    return null;
};

export default GenerateFilter;
