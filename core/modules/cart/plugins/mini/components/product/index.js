import Item from '@plugin_minicart/components/product/item';

import Button from '@common_button';
import Typography from '@common_typography';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import cx from 'classnames';

const ItemCart = (props) => {
    const {
        // prettier-ignore
        data,
        deleteCart,
        updateCart,
        t,
        storeConfig,
        currencyCache,
    } = props;

    if (data.length === 0) {
        return (
            <div className="w-full h-[calc(100vh-20rem)] gap-4 flex flex-col align-middle justify-center items-center">
                <ShoppingCartIcon className={cx('w-10 h-10 tablet:w-14 tablet:h-14 text-neutral-300')} />
                <Typography className="font-normal text-[14px] tablet:text-base">{t('common:cart:emptyCart')}</Typography>
                <Button
                    variant="primary"
                    className={cx('justify-center', 'h-full w-full max-h-[38px] tablet:max-h-[48px] max-w-[142px] tablet:max-w-[170px]')}
                    link="/"
                >
                    {t('common:button:startShopping')}
                </Button>
            </div>
        );
    }

    const [heightState, setHeight] = React.useState(500);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) {
                setHeight(window.innerHeight - 220);
            } else {
                setHeight(window.innerHeight - 260);
            }

            return () => {};
        }
        return null;
    }, [window]);

    return (
        <ol className={cx('overflow-y-auto')} style={{ height: heightState }}>
            {data.map((val, idx) => (
                <Item {...val} key={idx} deleteCart={deleteCart} updateCart={updateCart} storeConfig={storeConfig} currencyCache={currencyCache} />
            ))}
        </ol>
    );
};

export default ItemCart;
