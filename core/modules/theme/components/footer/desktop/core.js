/* eslint-disable no-param-reassign */
import noReload from '@helper_noreload';
import { useRouter } from 'next/router';
import { setResolver, getResolver } from '@helper_localstorage';
import { getCmsBlocks } from '@core_modules/theme/services/graphql';
import React, { useState } from 'react';
import { footerVersion } from '@config';

const Footer = (props) => {
    const {
        Content, t, storeConfig,
    } = props;
    const {
        data, loading, error,
    } = getCmsBlocks({ identifiers: [footerVersion] }, { skip: !storeConfig });
    const router = useRouter();
    const Config = {
        title: data && data.cmsBlocks ? data.cmsBlocks.title : '',
        headerTitle: data && data.cmsBlocks ? data.cmsBlocks.title : '',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };

    const linkAction = async (type, link) => {
        if (type === 'cms') {
            const urlResolver = getResolver();
            urlResolver[link] = {
                type: 'CMS_PAGE',
            };
            await setResolver(urlResolver);
            router.push('/[...slug]', link);
        } else {
            router.push('/[...slug]', link);
        }
    };

    React.useEffect(() => {
        noReload({
            action: linkAction,
        });
    }, [router.asPath]);

    // action accordion footer v2
    const [listAcc, setListAcc] = useState([]);

    const open = (accordionTitle, id) => {
        accordionTitle.classList.add('is-open');
        // eslint-disable-next-line no-use-before-define
        accordionTitle.onclick = () => close(accordionTitle, id);
    };

    const close = (accordionTitle, id) => {
        accordionTitle.classList.remove('is-open');
        accordionTitle.onclick = () => open(accordionTitle, id);
    };

    React.useEffect(() => {
        if (listAcc && listAcc.length > 0) {
            // eslint-disable-next-line array-callback-return
            listAcc.map((id) => {
                const accordionTitle = document.getElementById(id);
                accordionTitle.onclick = () => {
                    accordionTitle.classList.add('is-open');
                    accordionTitle.onclick = () => close(accordionTitle, id);
                };
            });
        }
    }, [listAcc]);

    React.useEffect(() => {
        if (typeof window !== 'undefined' && data) {
            const accordionTitles = document.querySelectorAll('.accordionTitle');
            const accList = [];
            accordionTitles.forEach((accordionTitle, key) => {
                const id = `acctitle${key}`;
                // eslint-disable-next-line no-param-reassign
                accordionTitle.id = id;
                accList.push(id);
            });
            setListAcc(accList);
        }
    }, [data]);

    return (
        <Content
            data={data}
            {...Config}
            t={t}
            loading={loading}
            error={error}
            storeConfig={storeConfig}
        />
    );
};

export default Footer;
