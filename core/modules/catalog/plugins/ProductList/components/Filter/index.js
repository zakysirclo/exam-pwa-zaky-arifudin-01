import React from 'react';
import { useRouter } from 'next/router';
import { generateCatalogSorting } from '@plugin_productlist/components/Shorting';
import FilterView from '@plugin_productlist/components/Filter/view';
import propTypes from 'prop-types';

const Filter = (props) => {
    const {
        filterValue, isSearch, defaultSort, setFiltervalue, filter, storeConfig,
        onSave, ...other
    } = props;
    const sortByData = React.useMemo(() => generateCatalogSorting(isSearch), []);
    const [openFilter, setOpenFilter] = React.useState(false);
    const [selectedFilter, setFilter] = React.useState(filterValue);
    const [sort, setSort] = React.useState(filterValue.sort ? filterValue.sort : '');
    const [priceRange, setPriceRange] = React.useState([0, 0]);
    const [maxPriceRange, setMaxPriceRange] = React.useState(0);
    const router = useRouter();

    // reset filter if route change
    React.useEffect(() => {
        const pricerangelist = filter.filter((data) => data.field === 'price');
        // eslint-disable-next-line radix
        const pricerangelistmaxvalue = parseInt(pricerangelist[0]?.value[pricerangelist[0]?.value.length - 1].value) || 0;
        setMaxPriceRange(pricerangelistmaxvalue);
        let initPriceRange = [];

        if (filterValue.priceRange) {
            initPriceRange = filterValue.priceRange.split(',');
            if (initPriceRange[0] === 'string') {
                initPriceRange[0] = parseInt(initPriceRange[0], 10);
            }

            if (initPriceRange[1] === 'string') {
                initPriceRange[1] = parseInt(initPriceRange[1], 10);
            }
        }

        setPriceRange(filterValue.priceRange ? filterValue.priceRange.split(',') : [0, pricerangelistmaxvalue]);
        setFilter(filterValue);
    }, [router.asPath, filter]);

    const handleClear = () => {
        const pricerangelist = filter.filter((data) => data.field === 'price');
        // eslint-disable-next-line radix
        const pricerangelistmaxvalue = parseInt(pricerangelist[0]?.value[pricerangelist[0]?.value.length - 1].value) || 0;
        // reset value for sort component
        setSort(defaultSort || '');

        // reset value for price range component
        setPriceRange(filterValue.priceRange ? filterValue.priceRange.split(',') : [0, pricerangelistmaxvalue]);

        // new filter with clear/reset value
        const newFilter = {
            q: selectedFilter.q,
            priceRange: [0, 0],
        };

        // delete params when empty value, ex: ...?q=undefined...
        Object.keys(newFilter).forEach((key) => {
            const emptyValues = [undefined, null, '', 'undefined', 'null'];
            if (emptyValues.includes(newFilter[key])) {
                delete newFilter[key];
            }
        });
        setOpenFilter(false);
        setFilter(newFilter);
        setFiltervalue({});
    };

    const handleReset = () => {
        router.push(`/${router.query.slug.join('/')}`);
        onSave(null);
    };

    const handleSave = () => {
        if (selectedFilter.priceRange) {
            delete selectedFilter.priceRange;
        }

        if (selectedFilter.sort) {
            delete selectedFilter.sort;
        }
        const savedData = {
            selectedFilter,
        };
        if (sort !== '') {
            savedData.sort = sort;
        }
        if (priceRange[1] !== 0) {
            savedData.priceRange = priceRange;
        }
        setFiltervalue(savedData);
        setOpenFilter(!openFilter);
        onSave(savedData);
    };

    const setCheckedFilter = (name, value) => {
        let selected = '';
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < value.length; index++) {
            selected += `${index !== 0 ? ',' : ''}${value[index]}`;
        }
        selectedFilter[name] = selected;
        setFilter({ ...selectedFilter });
    };

    const setSelectedFilter = (code, value) => {
        selectedFilter[code] = value;
        setFilter({ ...selectedFilter });
    };

    const ModalProps = {
        selectedFilter,
        setSelectedFilter,
        setCheckedFilter,
        handleSave,
        handleClear,
        sortByData,
        sort,
        setSort,
        priceRange,
        setPriceRange,
        maxPriceRange,
    };

    return (
        <FilterView
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            isSearch={isSearch}
            filter={filter}
            handleReset={handleReset}
            {...ModalProps}
            {...other}
        />
    );
};

Filter.propTypes = {
    onSave: propTypes.func,
    filterValue: propTypes.object.isRequired,
    isSearch: propTypes.bool.isRequired,
    defaultSort: propTypes.object.isRequired,
    setFiltervalue: propTypes.func.isRequired,
    filter: propTypes.array.isRequired,
    storeConfig: propTypes.object.isRequired,
};

Filter.defaultProps = {
    onSave: () => {},
};

export default Filter;
