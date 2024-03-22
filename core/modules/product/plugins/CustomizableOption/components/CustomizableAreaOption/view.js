import React from 'react';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import classNames from 'classnames';

const ViewCustomizableAreaOption = ({
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
                        label={(
                            <Typography variant="bd-2a">
                                {data.label}
                                {' '}
                                {required && <Typography variant="bd-2a" color="text-red">*</Typography>}
                            </Typography>
                        )}
                        className="customizableArea"
                        disabled={disabled}
                        onChange={onChange}
                        value={value}
                        error={error}
                        errorMessage={error}
                        multiline
                        rows={4}
                    />
                )
            }
        </div>
    );
};

export default ViewCustomizableAreaOption;
