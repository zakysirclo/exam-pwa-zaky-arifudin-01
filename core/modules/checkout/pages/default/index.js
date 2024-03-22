'use client';

/* eslint-disable react/destructuring-assignment */
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/checkout/pages/default/core';
import { Provider } from 'react-redux';
import { store } from '@core_modules/checkout/redux/store';
import Backdrop from '@common/Backdrop';
import { useEffect, useState } from 'react';

const Page = (props) => {
    const [isServer, setIsServer] = useState(true);
    useEffect(() => {
        setIsServer(false);
    }, []);
    return (
        <div>
            {
                isServer
                    ? <Backdrop open={isServer} />
                    : (
                        <Provider store={store}>
                            <Core
                                {...props}
                                pageConfig={{
                                    title: props.t('checkout:pageTitle'),
                                    header: 'relative', // available values: "absolute", "relative", false (default)
                                    headerTitle: props.t('checkout:pageTitle'),
                                    headerDesktop: false,
                                    footer: false,
                                    bottomNav: false,
                                    pageType: 'checkout',
                                }}
                            />
                        </Provider>
                    )
            }
        </div>
    );
};

export default withApollo({ ssr: false })(withTranslation()(Page));
