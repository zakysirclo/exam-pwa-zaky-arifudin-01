import TextField from '@common/Forms/TextField';
import Typography from '@common/Typography';
import { formatPrice } from '@helper_currency';
import cx from 'classnames';

// eslint-disable-next-line object-curly-newline
const RangeSlider = (props) => {
    const {
        disabled = false, onChange = () => {}, value = [0, 10], disableInput = false,
        storeConfig, minValue = 0, maxValue = 100, formatLabel, hideLabel = false,
    } = props;
    let min = value[0];
    if (typeof min === 'string') {
        min = Number(min);
    }
    let max = value[1];
    if (typeof max === 'string') {
        max = Number(max);
    }
    const [minVal, setMinVal] = React.useState(min);
    const [maxVal, setMaxVal] = React.useState(max);
    const minValRef = React.useRef(min);
    const maxValRef = React.useRef(max);
    const range = React.useRef(null);

    const getPercent = React.useCallback((valueX) => Math.round(((valueX - minValue) / (maxValue - minValue)) * 100), [min, max, maxValue, minValue]);

    React.useEffect(() => {
        if (maxValue > 0) {
            const minPercent = getPercent(min);
            const maxPercent = getPercent(max);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxValue, range]);

    React.useEffect(() => {
        const minPercent = getPercent(min);
        const maxPercent = getPercent(max);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    React.useEffect(() => {
        const minPercent = getPercent(min);
        const maxPercent = getPercent(max);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    return (
        <>
            <div className={cx(
                'flex flex-col w-full gap-4',
            )}
            >
                {!hideLabel ? (
                    <div className="flex flex-row justify-between items-center">
                        {
                            disableInput
                                ? (
                                    <Typography>
                                        {
                                            formatLabel && typeof formatLabel === 'function'
                                                ? formatLabel(min)
                                                : formatPrice(min, storeConfig && storeConfig.base_currency_code)
                                        }
                                    </Typography>
                                )
                                : (
                                    <TextField
                                        classWrapper="max-w-[45%]"
                                        className="max-w-full"
                                        value={minVal}
                                        onChange={(event) => {
                                            const valueMin = Math.min(Number(event.target.value), maxVal - 1);
                                            setMinVal(valueMin);
                                            onChange([valueMin, maxVal]);
                                            minValRef.current = valueMin;
                                        }}
                                        disabled={disabled}
                                    />
                                )
                        }

                        { !disableInput && <span className="text-neutral-900 font-bold">-</span> }

                        {
                            disableInput
                                ? (
                                    <Typography>
                                        {
                                            formatLabel && typeof formatLabel === 'function'
                                                ? formatLabel(max)
                                                : formatPrice(max, storeConfig && storeConfig.base_currency_code)
                                        }
                                    </Typography>
                                )
                                : (
                                    <TextField
                                        classWrapper="max-w-[45%]"
                                        className="max-w-full"
                                        value={maxVal}
                                        onChange={(event) => {
                                            const valueMax = Math.max(Number(event.target.value), minVal + 1);
                                            setMaxVal(valueMax);
                                            onChange([minVal, valueMax]);
                                            maxValRef.current = valueMax;
                                        }}
                                        disabled={disabled}
                                    />
                                )
                        }
                    </div>
                ) : null}

                <div className={cx(
                    'slider',
                    'relative w-full',
                )}
                >
                    <div className={cx('slider__track', 'absolute', 'rounded', 'h-[5px]', 'bg-neutral-200', 'w-[100%]', 'z-[1]')} />
                    { !disabled && <div ref={range} className={cx('slider__range', 'absolute', 'rounded', 'h-[5px]', 'bg-primary-700', 'z-[2]')} /> }

                    <input
                        type="range"
                        min={minValue}
                        max={maxValue}
                        value={min}
                        onChange={(event) => {
                            const valueMin = Math.min(Number(event.target.value), maxVal - 1);
                            setMinVal(valueMin);
                            onChange([valueMin, max]);
                            minValRef.current = valueMin;
                        }}
                        disabled={disabled}
                        className={cx('thumb', 'thumb--left', 'pointer-events-none', 'absolute', 'h-[0]', 'w-full', 'outline-none', 'z-[3]')}
                        style={{
                            zIndex: minVal > maxValue - 100 && '5',
                        }}
                    />
                    <input
                        type="range"
                        min={minValue}
                        max={maxValue}
                        value={max}
                        onChange={(event) => {
                            const valueMax = Math.max(Number(event.target.value), minVal + 1);
                            setMaxVal(valueMax);
                            onChange([min, valueMax]);
                            maxValRef.current = valueMax;
                        }}
                        disabled={disabled}
                        className={cx('thumb', 'thumb--right', 'pointer-events-none', 'absolute', 'h-[0]', 'w-full', 'outline-none', 'z-[4]')}
                    />
                </div>

            </div>
            <style jsx>
                {`
                    /* Removing the default appearance - cannot be done by tailwind */
                    .thumb,
                    .thumb::-webkit-slider-thumb {
                        -webkit-appearance: none;
                    }

                    /* For Chrome browsers */
                    .thumb::-webkit-slider-thumb {
                        background-color: white;
                        border: 1.5px solid #be1f93;
                        border-radius: 50%;
                        cursor: pointer;
                        height: 24px;
                        width: 24px;
                        margin-top: 4px;
                        pointer-events: all;
                        position: relative;
                    }

                    /* For Firefox browsers */
                    .thumb::-moz-range-thumb {
                        background-color: white;
                        border: 1.5px solid #be1f93;
                        border-radius: 50%;
                        cursor: pointer;
                        height: 24px;
                        width: 24px;
                        margin-top: 4px;
                        pointer-events: all;
                        position: relative;
                    }
                `}
            </style>
        </>
    );
};

export default RangeSlider;
