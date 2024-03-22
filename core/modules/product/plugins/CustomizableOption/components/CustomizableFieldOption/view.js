import React from 'react';
import Typography from '@common_typography';
import TextField from '@common_forms/TextField';
import classNames from 'classnames';

const ViewCustomizableFieldOption = ({
    title = 'test', data = {}, value = '', disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const customClass = classNames('flex flex-col', 'w-[100%]');

    return (
        <div className={customClass}>
            {
                data && data.uid && (
                    <TextField
                        options={data}
                        name={title}
                        disabled={disabled}
                        className="w-full"
                        classNameLabel="mb-[6px]"
                        onChange={onChange}
                        value={value}
                        label={(
                            <Typography variant="bd-2a">
                                {data.label}
                                {' '}
                                {required && <Typography variant="bd-2a" color="text-red">*</Typography>}
                            </Typography>
                        )}
                        hintProps={{
                            displayHintText: error !== '',
                            hintType: error !== '' ? 'error' : '',
                            hintText: error,
                            className: '!static mt-[6px]',
                        }}
                    />
                )
            }
        </div>
    );
};

export default ViewCustomizableFieldOption;
