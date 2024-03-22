import Button from '@common_button';
import Popover from '@common_popover';
import Typography from '@common_typography';
import Link from 'next/link';
import cx from 'classnames';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import Show from '@common_show';

const MobileTabletActionMenu = (props) => {
    const {
        t, orderNumber, reOrder, return: isRma, handlingReturn = () => {},
    } = props;

    const [open, setOpen] = React.useState(false);

    const PopoverContent = () => (
        <ul className={cx('py-2')}>
            <li className={cx('px-4', 'py-2')}>
                <Link href={`/sales/order/view/order_id/${orderNumber}`} className={cx('swift-orderactionview hover:text-primary-700')}>
                    <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                        {t('order:view')}
                    </Typography>
                </Link>
            </li>
            <li className={cx('px-4', 'py-2')}>
                <button type="button" onClick={() => reOrder(orderNumber)} className="swift-orderactionreorder">
                    <a>
                        <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                            {t('order:reorder')}
                        </Typography>
                    </a>
                </button>
            </li>
            <Show when={isRma}>
                <li className={cx('px-4', 'py-2')}>
                    <button type="button" onClick={() => handlingReturn()} className="swift-orderactionreturn">
                        <a>
                            <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                {t('order:smReturn')}
                            </Typography>
                        </a>
                    </button>
                </li>
            </Show>
        </ul>
    );

    return (
        <>
            <Popover
                content={<PopoverContent />}
                open={open}
                setOpen={setOpen}
                className={cx('top-[120%]', 'p-0', 'right-0')}
                wrapperClassName={cx('self-end')}
                wrapperId="top-header__content--currency-language-changer-menu__currency-switcher"
            >
                <Button
                    onClick={() => setOpen(!open)}
                    className={cx('swift-orderaction !p-0')}
                    variant="plain"
                    iconOnly
                    icon={<EllipsisVerticalIcon className="h-[20px] w-[24px]" />}
                    iconProps={{
                        className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]', 'text-primary-700'),
                    }}
                />
            </Popover>
        </>
    );
};

export default MobileTabletActionMenu;
