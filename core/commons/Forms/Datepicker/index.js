import TailwindDatepicker from 'tailwind-datepicker-react';
import cx from 'classnames';
import Show from '@common_show';
import Typography from '@common_typography';
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import TextField from '@common_forms/TextField';
import { COLORS } from '@theme_vars';
import dayjs from 'dayjs';

const Datepicker = (props) => {
    const {
        label = 'Date',
        name = 'date',
        value = '',
        onChange = () => {},
        error = false,
        errorMessage = '',
        classLabel = {},
        classWrapper,
        required = false,
        placeholder = 'Select Date',
        options = {},
        displayDateFormat = 'DD/MMM/YYYY',
    } = props;

    const [show, setShow] = React.useState(false);

    const handleChange = (selectedDate) => {
        let dateFormat = null;
        if (selectedDate) {
            dateFormat = [selectedDate.getFullYear(), (`0${selectedDate.getMonth() + 1}`).slice(-2), (`0${selectedDate.getDate()}`).slice(-2)].join(
                '-',
            );
        }
        onChange(dateFormat);
    };

    const handleClose = () => {
        setShow(!show);
    };

    const onClickIcon = () => {
        if (value) {
            onChange(null);
        } else {
            handleClose();
        }
    };

    const dateOptions = {
        inputNameProp: name,
        inputIdProp: name,
        inputPlaceholderProp: placeholder,
        clearBtn: false,
        todayBtn: false,
        theme: {
            background: 'bg-neutral-white border-[1px] border-neutral-200',
            disabledText: 'bg-neutral-200',
            selected: 'bg-primary text-neutral-white',
        },
        ...options,
    };

    const dateRef = React.useRef(null);

    /**
     * handle click & touch outside to close date
     * tailwind-datepicker-react lib bugs : only handle in their component
     */
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dateRef?.current) {
                return;
            }
            if (!dateRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', (event) => handleClickOutside(event));
        document.addEventListener('touchstart', (event) => handleClickOutside(event));

        return () => {
            document.removeEventListener('mousedown', (event) => handleClickOutside(event));
            document.removeEventListener('touchstart', (event) => handleClickOutside(event));
        };
    }, [dateRef]);

    return (
        <div className={cx('datepicker-section flex flex-col relative', classWrapper)}>
            <Show when={label}>
                <Typography variant="mb-2" className={cx('uppercase', classLabel)}>
                    {label}
                    <Show when={required}>
                        <span className={cx('text-red-600')}> *</span>
                    </Show>
                </Typography>
            </Show>
            <div ref={dateRef}>
                <TailwindDatepicker options={dateOptions} onChange={handleChange} setShow={handleClose} show={show} classNames={cx('')}>
                    <TextField
                        className="password-field mt-2 w-full"
                        type="text"
                        rightIcon={value ? <XCircleIcon color={COLORS.red.DEFAULT} /> : <CalendarIcon />}
                        rightIconProps={{
                            className: cx('cursor-pointer', value ? 'text-red' : ''),
                            onClick: () => {
                                onClickIcon();
                            },
                        }}
                        hintProps={{
                            displayHintText: error,
                            hintType: error ? 'error' : '',
                            hintText: errorMessage,
                            className: cx('my-2'),
                        }}
                        absolute={false}
                        value={value ? dayjs(value).format(displayDateFormat) : ''}
                        onFocus={() => setShow(!show)}
                        placeholder={placeholder}
                        readOnly
                    />
                </TailwindDatepicker>
            </div>
        </div>
    );
};

export default Datepicker;
