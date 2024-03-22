/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';
import Tabs from '@common/Tabs';

function TabLayout({ noBanner, t, children }) {
    const router = useRouter();
    const { route, query: { sellerPath } } = router;
    const isTabTwo = route === '/seller/[sellerPath]/product' || noBanner;

    const data = [
        {
            title: t('seller:home'),
            content: '',
            type: 'html',
        },
        {
            title: t('seller:product'),
            content: '',
            type: 'html',
        },
    ];

    return (
        <>
            <Tabs
                data={data}
                tabHasContent={false}
                t={t}
                allItems={false}
                tabHasContentClass="pt-[24px]"
                tabContentClassName="mt-[24px]"
                tabTitleClassName="hover:border-b-[4px] cursor-pointer !min-w-0 !px-[20px] !py-[13px]"
                tabTitleActiveClassName="border-b-[4px]"
                activeTabsProps={isTabTwo ? 1 : 0}
                onChange={(e) => {
                    if (e === 0) {
                        router.replace(`/seller/${sellerPath}`);
                    } else if (e === 1) {
                        router.replace(`/seller/${sellerPath}/product`);
                    }
                }}
            />
            <div className="mt-4">
                {children}
            </div>
        </>
    );
}

export default TabLayout;
