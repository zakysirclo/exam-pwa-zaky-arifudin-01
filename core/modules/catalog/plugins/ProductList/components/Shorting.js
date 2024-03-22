import { modules } from '@config';
import Select from '@common/Forms/Select';

export const generateCatalogSorting = (isSearch) => {
    let updatedSort;
    const baseSort = [
        { value: { key: 'name', value: 'ASC' }, label: 'Alphabetically (A to Z)' },
        { value: { key: 'name', value: 'DESC' }, label: 'Alphabetically (Z to A)' },
        { value: { key: 'price', value: 'ASC' }, label: 'Price (Low to High)' },
        { value: { key: 'price', value: 'DESC' }, label: 'Price (High to Low)' },
    ];
    const catalogSort = [
        { value: { key: 'position', value: 'ASC' }, label: 'Most Relevance' },
    ];
    const searchSort = [
        { value: { key: 'relevance', value: 'DESC' }, label: 'Relevance' },
    ];

    if (isSearch) {
        updatedSort = [...searchSort, ...baseSort];
    } else {
        updatedSort = [...catalogSort, ...baseSort];
    }

    const { catalog } = modules;
    const sortList = catalog.productListing.sort;
    updatedSort = updatedSort.filter((sort) => sortList[sort.value.key]).map((updatedSortData) => ({
        ...updatedSortData,
        value: JSON.stringify({ key: updatedSortData.value.key, value: updatedSortData.value.value }),
    }));

    return updatedSort;
};

const Sorting = (props) => {
    const {
        isSearch, filterValue, setFiltervalue, t,
    } = props;
    const sortByData = React.useMemo(() => generateCatalogSorting(isSearch), []);

    const [selectedFilter] = React.useState(filterValue);
    const [value, setValue] = React.useState(selectedFilter.sort);

    const handleChange = (event) => {
        const savedData = {
            selectedFilter,
        };
        if (value !== '') {
            savedData.sort = event;
            setValue(event);
        }

        setFiltervalue(savedData);
    };

    const shortingValue = sortByData.filter((item) => item.value === value);

    return (
        <Select
            options={sortByData}
            onChange={handleChange}
            placeholder={t('catalog:title:short')}
            className="h-[38px]"
            value={shortingValue && shortingValue.length > 0 ? shortingValue[0].label : ''}
            textFiledProps={{
                className: 'swift-sorter-options h-[38px] !border-neutral-200 tablet:h-auto !w-[auto] ml-2 tablet:-mt-[1px]',
                rightIconProps: {
                    className: '!text-neutral-600',
                },
            }}
            inputProps={{
                className: 'h-[34px] !font-semibold placeholder:!text-neutral placeholder:!font-semibold',
            }}
        />
    );
};

export default Sorting;
