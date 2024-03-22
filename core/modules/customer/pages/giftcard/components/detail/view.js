import Dialog from '@common/Dialog';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import Loader from '@core_modules/customer/pages/giftcard/components/skeleton';
import cx from 'classnames';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import formatDate from '@helper_date';
import Show from '@common_show';
import Alert from '@common_alert';

const DetailView = (props) => {
    const {
        t, loading, error, data, open, close, storeConfig, currencyCache,
    } = props;

    return (
        <Dialog variant="plain" open={open} onClose={close}>
            <div>
                <div
                    className={cx(
                        'desktop:w-[500px] tablet:w-[400px] mobile:w-[300px]',
                        'bg-neutral-white',
                        'rounded-[10px]',
                        'p-[15px]',
                        'm-[15px]',
                    )}
                >
                    <div className={cx('overflow-y-auto', 'max-h-[85vh]')}>
                        <div className={cx('pb-[10px]', 'flex justify-end')}>
                            <div
                                onClick={close}
                                aria-label="close"
                                aria-hidden="true"
                                className={cx('bg-neutral-white', 'h-[30px]', 'w-[30px]', 'hover:cursor-pointer')}
                            >
                                <XMarkIcon className="text-neutral-500" />
                            </div>
                        </div>
                        <Show when={loading}>
                            <Loader />
                        </Show>
                        <Show when={error}>
                            <Alert className="m-15" severity="error" withIcon>
                                {error?.message?.includes('No such entity with giftcardCode')
                                    ? t('customer:giftCard:searchNotFound')
                                    : error?.message}
                            </Alert>
                        </Show>
                        <Show when={data}>
                            <div className={cx('mt-[20px]', 'px-[10px]')}>
                                <ul className={cx('w-full', 'rounded-[10px]', 'mb-[10px]', 'border-neutral-250', 'border-[1px]')}>
                                    {data?.giftCardAccount
                                        && Object.keys(data.giftCardAccount).map((item, index) => {
                                            if (item === '__typename') {
                                                return <></>;
                                            }

                                            const label = t(`customer:giftCard:labelResponse:${item}`);
                                            let value = data.giftCardAccount[item];
                                            if (item.includes('balance')) {
                                                value = formatPrice(value, storeConfig.base_currency_code, currencyCache);
                                            } else if (item.includes('date')) {
                                                value = value ? formatDate(value, 'DD/MM/YYYY') : '-';
                                            }

                                            return (
                                                <li key={index} className={cx('p-[10px]')}>
                                                    <div className="flex flex-row justify-between">
                                                        <Typography className="!text-primary">{label}</Typography>
                                                        <Typography className="!text-neutral-black">{value}</Typography>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </Show>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DetailView;
