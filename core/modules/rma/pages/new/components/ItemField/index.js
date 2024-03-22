/* eslint-disable jsx-a11y/anchor-is-valid */

const ItemField = ({
    options = [],
    name = 'select',
    label = 'Select',
    onSelect = () => {},
    propsValue = {},
    errorForm = false,
    errorMessage = '',
    required = false,
    t,
    ItemFieldView,
    ...other
}) => {
    const [select, setSelect] = React.useState('');
    const handleSelect = (value) => {
        setSelect(value);
        onSelect({
            ...propsValue,
            value,
        });
    };
    let error = false;
    if (errorForm && required) {
        if (select === '' || select.length === 0) error = true;
    }
    return (
        <ItemFieldView
            options={options}
            name={name}
            label={label}
            select={select}
            handleSelect={handleSelect}
            error={error}
            errorMessage={errorMessage}
            t={t}
            {...other}
        />
    );
};

export default ItemField;
