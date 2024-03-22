/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Layout from '@layout_customer';
import cx from 'classnames';
import Typography from '@common_typography';
import Pagination from '@common_pagination';
import Show from '@common_show';
import Skeleton from '@core_modules/notification/pages/list/components/skeleton';
import Alert from '@common_alert';

const NotificationList = (props) => {
    const {
        t, data, handleItemClick, localDateString, loading, error,
    } = props;

    if (loading) {
        return (
            <Layout {...props}>
                <Skeleton />
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout {...props}>
                <div>
                    <Alert severity="error" withIcon>{`Error: ${error.message}`}</Alert>
                </div>
            </Layout>
        );
    }
    if (!data) {
        return (
            <Layout {...props}>
                <div>
                    <Alert severity="warning" withIcon>
                        {t('notification:not_found')}
                    </Alert>
                </div>
            </Layout>
        );
    }

    if (data.customerNotificationList.items.length === 0) {
        return (
            <Layout {...props}>
                <div>
                    <Alert severity="warning" withIcon>
                        {t('notification:empty')}
                    </Alert>
                </div>
            </Layout>
        );
    }

    const [page, setPage] = useState(1);
    const notifCount = data.customerNotificationList.items.length;
    const notifLimit = 10;
    const totalPage = notifCount < notifLimit ? 1 : Math.ceil(notifCount / notifLimit);

    const notifList = Array.from({ length: totalPage }, (_, i) =>
        data.customerNotificationList.items.slice(i * notifLimit, i * notifLimit + notifLimit));

    const handleChangePage = (value) => {
        setPage(value);
    };

    const hasData = notifCount > 0;

    const PaginationComponent = () => (
        <div className={cx('table-data pt-6 flex justify-between', 'tablet:items-center tablet:flex-row', 'mobile:flex-col')}>
            <div className="flex justify-between items-center flex-1">
                <Typography className={cx('font-normal', 'leading-2lg')}>{`${notifCount ?? 0} ${t('common:label:data')}`}</Typography>
            </div>
            <div className={cx('flex', 'flex-row', 'items-center', 'mobile:max-tablet:pt-4', 'mobile:max-tablet:justify-center')}>
                <Pagination
                    clickToTop
                    handleChangePage={handleChangePage}
                    page={page}
                    siblingCount={0}
                    className={cx('!p-0')}
                    totalPage={totalPage}
                />
            </div>
        </div>
    );

    return (
        <Layout {...props}>
            <div className="swift-notification-list">
                <Show when={hasData}>
                    {notifList[page - 1].map((item, i) => (
                        <div
                            key={i}
                            onClick={() => handleItemClick(item)}
                            className={cx(
                                'swift-notification-item',
                                'relative border-t-[1px] border-b-[1px] border-neutral-100',
                                'px-8 py-6 cursor-pointer hover:bg-neutral-100',
                            )}
                        >
                            <Typography variant={item.unread ? 'p-2a' : 'p-2'} className={cx()}>
                                {item.subject}
                            </Typography>
                            <Typography variant={item.unread ? 'p-3a' : 'p-3'} className={cx('mt-1')}>
                                {localDateString(item.createdAt)}
                            </Typography>
                            <Show when={item.unread}>
                                <div
                                    className={cx('absolute left-[14px] top-[50%] bg-primary-700 rounded-full', 'translate-y-[-50%] w-[6px] h-[6px]')}
                                />
                            </Show>
                        </div>
                    ))}
                </Show>
                {/** show pagination */}
                <Show when={hasData}>
                    <PaginationComponent />
                </Show>
            </div>
        </Layout>
    );
};

export default NotificationList;
