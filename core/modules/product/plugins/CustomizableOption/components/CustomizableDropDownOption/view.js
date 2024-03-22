import React from 'react';
import Typography from '@common_typography';
import Select from '@common_forms/Select';
import classNames from 'classnames';

const ViewCustomizableDropDownOption = ({
    title = 'test', data = [], selected = '', disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const customClass = classNames('flex flex-col', 'w-[100%]');
    return (
        <div className={customClass}>
            {
                data && data.length > 0 && (
                    <Select
                        disabled={disabled}
                        options={data}
                        name={title}
                        value={selected}
                        onChange={onChange}
                        error={error !== ''}
                        errorMessage={error}
                        label={(
                            <Typography variant="bd-2a" className="font-bold">
                                {title.replace(/_/g, ' ')}
                                {' '}
                                {required && <Typography variant="bd-2a" className="font-bold text-red">*</Typography>}
                            </Typography>
                        )}
                        optionProps={{
                            className: 'absolute',
                        }}
                        textFiledProps={{
                            className: '!w-full mt-[6px]',
                        }}
                    />
                )
            }
            {
                error && error !== '' && (
                    <Typography className="text-red">{error}</Typography>
                )
            }
        </div>
    );
};

export default ViewCustomizableDropDownOption;
