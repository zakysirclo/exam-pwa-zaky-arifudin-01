import React from 'react';
import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import classNames from 'classnames';

const ViewCustomizableRadioOption = ({
    title = 'test', data = [], selected = [], disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const Label = () => (
        <>
            <Typography variant="bd-2a">
                {title.replace(/_/g, ' ')}
                {' '}
                {required && <Typography variant="bd-2a" color="text-red">*</Typography>}
            </Typography>
        </>
    );
    const customClass = classNames('flex flex-col', 'w-[100%]');

    return (
        <div className={customClass}>
            {
                data && data.length > 0 && (
                    <Radio
                        size="sm"
                        var
                        name={title}
                        label={title}
                        CustomLabel={Label}
                        data={data}
                        value={selected || ''}
                        flex="column"
                        onChange={onChange}
                        disabled={disabled}
                    />
                )
            }
            {
                error && error !== '' && (
                    <Typography variant="bd-2a" color="text-red">{error}</Typography>
                )
            }
        </div>
    );
};

export default ViewCustomizableRadioOption;
