import React from 'react';
import Accordion from '@common/Accordion';
import cx from 'classnames';
import GenerateFilter from '@core_modules/catalog/plugins/ProductList/components/Filter/GenerateFilter';
import Button from '@common_button';
import Divider from '@common_divider';

const FilterView = (props) => {
    const {
        filter = [], handleSave, handleReset,
        scrollContent = true, t,
    } = props;

    return (
        <div className={cx(
            'flex flex-col gap-5 w-full relative desktop:max-w-[280px] overflow-y-scroll overflow-x-hidden scrollbar-none pb-[50%]',
            scrollContent ? ' max-h-screen' : 'h-full',
        )}
        >
            {
                filter && filter.length > 0 && filter.map((itemFilter, key) => {
                    if ((itemFilter.field === 'cat' || itemFilter.field === 'attribute_set_id')) {
                        return null;
                    }
                    if (itemFilter.field === 'indexed_attributes' || itemFilter.field === 'category_uid') {
                        return null;
                    }
                    return (
                        <React.Fragment
                            key={key}
                        >
                            <Accordion
                                label={itemFilter.label ? itemFilter.label.replace(/_/g, ' ') : ''}
                                open
                            >
                                <GenerateFilter
                                    itemFilter={itemFilter}
                                    idx={key}
                                    {...props}
                                />
                            </Accordion>
                            <Divider />
                        </React.Fragment>
                    );
                })
            }

            <div className="flex flex-col gap-4 w-full desktop:hidden fixed bottom-0 left-0 p-4 bg-neutral-white shadow-inner z-10">
                <Button
                    onClick={handleReset}
                    className="w-full"
                    classNameText="justify-center"
                    variant="tertiary"
                >
                    {t('catalog:filter:reset')}
                </Button>
                <Button
                    onClick={handleSave}
                    className="w-full"
                    classNameText="justify-center"
                >
                    {t('catalog:filter:viewResult')}
                </Button>
            </div>
        </div>
    );
};

export default FilterView;
