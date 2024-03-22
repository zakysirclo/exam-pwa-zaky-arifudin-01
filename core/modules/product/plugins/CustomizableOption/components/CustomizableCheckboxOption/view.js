import React from 'react';
import CheckBox from '@common_forms/CheckBox';
import Typography from '@common_typography';
import classNames from 'classnames';

const ViewCustomizableCheckboxOption = ({
    title = 'test', data = [], selected = [], disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const customClass = classNames('flex flex-col', 'w-[100%]');
    return (
        <div className={customClass}>
            {
                data && data.length > 0 && (
                    <>
                        <Typography variant="bd-2a">
                            {title.replace(/_/g, ' ')}
                            {' '}
                            {required && <Typography variant="bd-2a" color="text-red">*</Typography>}
                        </Typography>
                        <CheckBox
                            name={title}
                            label={title}
                            noLabel
                            data={data}
                            value={selected || []}
                            flex="column"
                            onChange={onChange}
                            disabled={disabled}
                        />
                    </>
                )
            }
            {
                error && error !== '' && (
                    <Typography color="red">{error}</Typography>
                )
            }
        </div>
    );
};

export default ViewCustomizableCheckboxOption;
