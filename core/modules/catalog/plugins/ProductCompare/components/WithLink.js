/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import BadgeCounter from '@common_badgecounter';
import ArrowsRightLeftIcon from '@heroicons/react/24/solid/ArrowsRightLeftIcon';
import cx from 'classnames';
import Link from 'next/link';

const WithLink = ({ compareList, handleLink }) => {
    if (compareList && compareList.compareList && compareList.compareList.item_count) {
        return (
            <Link href={handleLink} prefetch={false} className={cx('group')}>
                {compareList ? (
                    <BadgeCounter value={compareList.compareList.item_count > 0 ? compareList.compareList.item_count : 0}>
                        <ArrowsRightLeftIcon
                            className={cx('w-[24px]', 'text-neutral-600', 'hover:text-primary-700', 'group-hover:text-primary-700', 'mt-3')}
                        />
                    </BadgeCounter>
                ) : (
                    <BadgeCounter value={0}>
                        <ArrowsRightLeftIcon
                            className={cx('w-[24px]', 'text-neutral-600', 'hover:text-primary-700', 'group-hover:text-primary-700', 'mt-3')}
                        />
                    </BadgeCounter>
                )}
            </Link>
        );
    }
    return (
        <Link href={handleLink} prefetch={false} className={cx('group')}>
            <BadgeCounter value={0}>
                <ArrowsRightLeftIcon
                    className={cx('w-[24px]', 'text-neutral-600', 'hover:text-primary-700', 'group-hover:text-primary-700', 'mt-3')}
                />
            </BadgeCounter>
        </Link>
    );
};

export default WithLink;
