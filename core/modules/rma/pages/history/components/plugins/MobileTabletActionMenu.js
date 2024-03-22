import Button from '@common_button';
import Popover from '@common_popover';
import Typography from '@common_typography';
import cx from 'classnames';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';

const MobileTabletActionMenu = (props) => {
    const { t, openDetail = () => {} } = props;

    const [open, setOpen] = React.useState(false);

    const PopoverContent = () => (
        <ul className={cx('py-2')}>
            <li className={cx('px-4', 'py-2')}>
                <button
                    type="button"
                    className={cx('swift-mobile-action-viewdetail', 'w-[100px]')}
                    onClick={() => {
                        openDetail();
                    }}
                >
                    <a>
                        <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                            {t('rma:table:view')}
                        </Typography>
                    </a>
                </button>
            </li>
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
                wrapperId="mobile-tablet-action"
            >
                <Button
                    onClick={() => setOpen(!open)}
                    className={cx('swift-mobile-action', '!p-0')}
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
