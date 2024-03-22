/* eslint-disable no-return-assign */
import { useRef, useEffect, useState } from 'react';
import Layout from '@layout';
import { useMutation } from '@apollo/client';
import { getCustomerSettings } from '@core_modules/customer/services/graphql';
import * as Schema from '@core_modules/customer/services/graphql/schema';

const NewsletterPage = (props) => {
    const { t, Content } = props;
    const [actUpdateCustomer, { data: dataUpdate }] = useMutation(Schema.updateCustomer, {
        context: {
            request: 'internal',
        },
    });
    const mount = useRef();
    const { data, loading } = getCustomerSettings();
    const [isSubscribedBefore, setIsSubscribedBefore] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const config = {
        title: t('customer:setting:newsletter'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:setting:newsletter'),
        bottomNav: false,
        tagSelector: 'swift-page-newsletter',
    };

    const handleChange = () => {
        setIsSubscribed(!isSubscribed);
    };

    /**
     * [useEffect] lifecycle react
     * init data
     */

    useEffect(() => {
        mount.current = true;
        if (mount.current) {
            const customerData = data?.customer;
            if (customerData) {
                setIsSubscribed(!!customerData.is_subscribed);
                setIsSubscribedBefore(!!customerData.is_subscribed);
            }
        }
        return () => (mount.current = false);
    }, [data]);

    // update data
    useEffect(() => {
        if (mount.current) {
            const customerData = dataUpdate?.updateCustomer?.customer;
            if (customerData) {
                setIsSubscribed(!!customerData.is_subscribed);
                setIsSubscribedBefore(!!customerData.is_subscribed);
            }
        }
    }, [dataUpdate]);

    /**
     * [METHOD] handle save button
     */
    const handleSave = async () => {
        window.backdropLoader(true);
        try {
            await actUpdateCustomer({
                variables: {
                    isSubscribed,
                },
                context: {
                    request: 'internal',
                },
            });
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('customer:setting:newsletter_success'),
                variant: 'success',
            });
        } catch (e) {
            window.backdropLoader(false);
            setIsSubscribed(isSubscribedBefore);
            let errorMessage = t('customer:setting:newsletter_error');
            if (e.message) {
                errorMessage = `${errorMessage} : ${e.message}`;
            }
            window.toastMessage({
                open: true,
                text: errorMessage,
                variant: 'error',
            });
        }
    };

    return (
        <Layout {...props} pageConfig={config}>
            <Content
                t={t}
                handleSave={handleSave}
                isSubscribed={isSubscribed}
                isSubscribedBefore={isSubscribedBefore}
                handleChange={handleChange}
                loading={loading}
            />
        </Layout>
    );
};

export default NewsletterPage;
