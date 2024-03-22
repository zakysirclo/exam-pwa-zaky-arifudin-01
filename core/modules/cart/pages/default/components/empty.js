import Typography from '@common_typography';
import Button from '@common_button';
import classNames from 'classnames';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';

const EmptyView = (props) => {
    const { t } = props;
    return (
        <div className="flex flex-col align-middle justify-center items-center w-full gap-4">
            <ShoppingCartIcon className={classNames('w-10 h-10 tablet:w-14 tablet:h-14 text-neutral-300')} />
            <Typography className="font-normal text-[14px] tablet:text-base">{t('common:cart:emptyCart')}</Typography>
            <Button
                variant="primary"
                className={classNames('justify-center', 'h-full w-full max-h-[38px] tablet:max-h-[48px] max-w-[142px] tablet:max-w-[170px]')}
                link="/"
            >
                {t('common:button:startShopping')}
            </Button>
        </div>
    );
};

export default EmptyView;
