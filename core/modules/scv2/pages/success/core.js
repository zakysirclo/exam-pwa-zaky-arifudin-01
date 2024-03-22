import Layout from '@layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getCheckoutData, removeCheckoutData } from '@root/core/helpers/cookies';
import { removeCartId } from '@root/core/helpers/cartId';

const Seller = (props) => {
    const { t, pageConfig } = props;
    const router = useRouter();

    const [seconds, setSeconds] = useState(7);

    const deleteCheckoutData = () => {
        const cdt = getCheckoutData();
        if (cdt) removeCheckoutData();
        removeCartId();
    };

    useEffect(
        () =>
            function cleanup() {
                if (typeof window !== 'undefined') {
                    deleteCheckoutData();
                }
            },
        [],
    );

    useEffect(() => {
        deleteCheckoutData();
        const backdropTimeout = setTimeout(() => {
            window.backdropLoader(true);
        }, 100);
        const countdownInterval = setInterval(() => {
            // Decrease the seconds every second
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Clear interval and timeout when the component is unmounted
        return () => {
            clearInterval(countdownInterval);
            clearTimeout(backdropTimeout);
        };
    }, []);

    useEffect(() => {
        // Check if the countdown has reached 0
        if (seconds === 0) {
            // Perform any action when the countdown reaches 0
            window.backdropLoader(false);
            router.replace('/');
        }
    }, [seconds]);

    const config = {
        title: t('scv2:success:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('scv2:success:title'),
        bottomNav: true,
        customFilter: false,
        search: '',
    };

    return (
        <Layout
            pageConfig={pageConfig || config}
            withLayoutHeader={false}
            withLayoutFooter={false}
            {...props}
        />
    );
};

export default Seller;
