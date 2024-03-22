/* eslint-disable max-len */
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { useTranslation } from 'next-i18next';

const FieldPoint = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    action,
    disabled = false,
    id = null,
    name = null,
    error,
    errorMessage = 'error',
    loading = false,
    toggleField = false,
    styleFrame = {},
    styleFrameText = {},
    styleTextField = {},
}) => {
    const { t } = useTranslation(['common']);

    return (
        <div className="w-full" id={id}>
            <div className="flex flex-row items-start gap-3" style={styleFrame}>
                <TextField
                    id={`${id}Textfield`}
                    name={name}
                    styleFrameText={styleFrameText}
                    styleTextField={styleTextField}
                    disabled={!!(disabled || toggleField)}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full tablet:w-[320px]"
                    absolute={false}
                    hintProps={{
                        displayHintText: error,
                        hintText: errorMessage,
                        hintType: 'error',
                        className: 'max-w-[320px]',
                    }}
                />
                <Button
                    variant="outlined"
                    onClick={action}
                    disabled={disabled || loading || value === ''}
                    className="h-[43px] swift-action-apply"
                    loading={loading}
                >
                    <Typography
                        color={loading || disabled || value === '' ? 'text-neutral-200' : 'text-neutral'}
                        className="uppercase"
                    >
                        {toggleField ? t('common:button:remove') : t('common:button:apply')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default FieldPoint;
