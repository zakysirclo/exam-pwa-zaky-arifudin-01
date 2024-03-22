/* eslint-disable react/no-danger */
import cx from 'classnames';
import Typography from '@common_typography';
import Layout from '@layout_customer';
import Skeleton from '@core_modules/notification/pages/detail/components/skeleton';
import Alert from '@common/Alert';

const NotificationData = (props) => {
    const {
        t, loading, error, data, localDateString,
    } = props;

    if (loading) {
        return (
            <Layout {...props} title={t('customer:menu:notification')}>
                <Skeleton />
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout {...props} title={t('customer:menu:notification')}>
                <div>
                    <Alert severity="error">
                        <Typography variant="p-2a" className={cx()}>
                            {`Error: ${error.message}`}
                        </Typography>
                    </Alert>
                </div>
            </Layout>
        );
    }
    if (!data) {
        return (
            <Layout {...props} title={t('customer:menu:notification')}>
                <div>
                    <Alert severity="warning" className={cx('pt-5')}>
                        <Typography variant="p-2a" className={cx()}>
                            {t('notification:not_found')}
                        </Typography>
                    </Alert>
                </div>
            </Layout>
        );
    }

    const item = data.readNotification.items[0];

    return (
        <Layout {...props} activeMenu="/inboxnotification/notification" title={t('customer:menu:notification')}>
            <div>
                <Typography variant="p-2" className={cx('mb-5 font-semibold')}>
                    {localDateString(item.createdAt)}
                </Typography>
                <Typography variant="p-2" className={cx('mb-1')}>
                    {item.subject}
                </Typography>
                <div
                    className={cx('text-pwa-font text-base font-normal leading-2lg tracking-normal')}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                />
            </div>
        </Layout>
    );
};

export default NotificationData;
