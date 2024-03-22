import Layout from '@layout';
import Router from 'next/router';
import { customerNotificationList } from '@core_modules/notification/services/graphql';

const NotificationList = (props) => {
    const { t, Content } = props;
    const config = {
        title: t('notification:notificationList:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('notification:notificationList:pageTitle'),
        bottomNav: false,
        tagSelector: 'swift-page-notification',
    };
    const { loading, data, error } = customerNotificationList();

    const localDateString = (stringTime) =>
        new Date(stringTime).toLocaleDateString(
            {},
            {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            },
        );

    const handleItemClick = (item) => {
        Router.push({
            pathname: '/inboxnotification/notification/data',
            query: { notif: item.entityId },
        });
    };
    return (
        <Layout {...props} pageConfig={config}>
            <Content t={t} data={data} localDateString={localDateString} handleItemClick={handleItemClick} loading={loading} error={error} />
        </Layout>
    );
};

export default NotificationList;
