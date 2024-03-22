import Typography from '@common/Typography';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

const StockStatus = ({
    alertSize = 12,
    alertColor,
    inStock = false,
    label,
    labelVariant = 'bd-2b',
    className,
}) => {
    const { t } = useTranslation(['common']);
    let labelFinal = label;
    if (!label) {
        labelFinal = inStock ? t('common:cart:inStock') : t('common:cart:oos');
    }
    return (
        <div className={cx(
            'stock-status',
            'flex items-center',
            className,
        )}
        >
            <div
                style={{
                    ...(alertSize ? { width: alertSize, height: alertSize } : null),
                }}
                className={cx(
                    inStock && !alertColor && 'bg-green-500',
                    !inStock && !alertColor && 'bg-red-500',
                    alertColor,
                    'rounded-[999px]',
                )}
            />
            <Typography variant={labelVariant} className="ml-[6px]">{labelFinal}</Typography>
        </div>
    );
};

export default StockStatus;
