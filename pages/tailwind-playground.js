/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import getLayoutSSRProps from '@core_modules/theme/layout/ssr';
import Layout from '@layout';
import createApolloClient from '@lib/apollo/apolloClient';
import { withApollo } from '@lib_apollo';
import cx from 'classnames';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Button from '@common_button';
// import Typography from '@common_typography';
// import TextField from '@common_forms/TextField';
// import Select from '@common_forms/Select';
// import Checkbox from '@common_forms/CheckBox';
// import Radio from '@common_forms/Radio';
// import TextField from '@common_textfield';
// import dynamic from 'next/dynamic';
// import { useState } from 'react';
// import { useRouter } from 'next/router';

import Tabs from '@common_tabs';

// const TextField = dynamic(() => import('@common_textfield'), { ssr: false });
// const PhoneInput = dynamic(() => import('@common_forms/PhoneInput'), { ssr: false });

function Page(props) {
    const { t } = props;
    // const router = useRouter();

    // eslint-disable-next-line no-unused-vars
    const [data, setData] = React.useState([
        {
            id: 3,
            name: 'Gear',
            description: null,
            url_path: 'gear',
            image: null,
            image_path: '',
            meta_description: null,
            meta_keywords: null,
            meta_title: null,
            breadcrumbs: null,
            children: [
                {
                    id: 4,
                    name: 'Bags',
                    image: null,
                    url_path: 'gear/bags',
                    __typename: 'CategoryTree',
                },
                {
                    id: 5,
                    name: 'Fitness Equipment',
                    image: null,
                    url_path: 'gear/fitness-equipment',
                    __typename: 'CategoryTree',
                },
                {
                    id: 6,
                    name: 'Watches',
                    image: null,
                    url_path: 'gear/watches',
                    __typename: 'CategoryTree',
                },
                {
                    id: 6,
                    name: 'Watches',
                    image: null,
                    url_path: 'gear/watches',
                    __typename: 'CategoryTree',
                },
                {
                    id: 6,
                    name: 'Watches',
                    image: null,
                    url_path: 'gear/watches',
                    __typename: 'CategoryTree',
                },
                {
                    id: 6,
                    name: 'Watches',
                    image: null,
                    url_path: 'gear/watches',
                    __typename: 'CategoryTree',
                },
                {
                    id: 6,
                    name: 'Watches',
                    image: null,
                    url_path: 'gear/watches',
                    __typename: 'CategoryTree',
                },
                {
                    id: 6,
                    name: 'Watches',
                    image: null,
                    url_path: 'gear/watches',
                    __typename: 'CategoryTree',
                },
            ],
            cms_block: null,
            display_mode: 'PRODUCTS',
            __typename: 'CategoryTree',
        },
    ]);

    const [value, setValue] = React.useState(0);

    // eslint-disable-next-line no-unused-vars
    const handleChange = (event, newValue) => {
        setValue(event);
    };

    const expandData = [
        {
            title: 'Detail',
            type: 'html',
            content:
                '<p>The Didi Sport Watch helps you keep your workout plan down to the second. The vertical, digital face looks sleek and futuristic. This watch is programmed with tons of helpful features such as a timer, an alarm clock, a pedometer, and more to help make your excercise more productive.</p>\n<ul>\n<li>Digital display.</li>\n<li>LED backlight.</li>\n<li>Rubber strap with buckle clasp.</li>\n<li>1-year limited warranty.</li>\n</ul>',
        },
        {
            title: 'More Info',
            type: 'array',
            content: [
                {
                    __typename: 'MoreInfoData',
                    label: 'Activity',
                    value: 'Gym, Athletic',
                },
                {
                    __typename: 'MoreInfoData',
                    label: 'Material',
                    value: 'Metal, Rubber, Silicone',
                },
                {
                    __typename: 'MoreInfoData',
                    label: 'Gender',
                    value: 'Women',
                },
                {
                    __typename: 'MoreInfoData',
                    label: 'Category',
                    value: 'Electronic, Exercise, Timepiece',
                },
            ],
        },
    ];

    const ListReviews = () => <div>Reviews</div>;

    return (
        <Layout t={t} {...props}>
            {/* <div className="flex items-center justify-center"> */}
            <div className={cx('!pt-4', 'px-0', 'h-[1080px]', 'desktop:py-16', 'tablet:py-8', '!pl-[6px]')}>
                {data && data[0].children && (
                    <Tabs
                        data={data[0].children}
                        onChange={handleChange}
                        allItems={false}
                        value={value}
                        tabPanel
                        expandData={expandData}
                        ListReviews={ListReviews}
                    />
                )}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const apolloClient = createApolloClient({}, ctx);
    // layout
    await getLayoutSSRProps({ apolloClient });

    // translation
    const translation = await serverSideTranslations(ctx.locale, ['common', 'home']);

    // for gql ssr cache
    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            ...translation,
            apolloState,
        },
    };
}

export default withApollo({ ssr: true })(withTranslation()(Page));
