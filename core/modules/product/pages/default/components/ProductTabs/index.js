import Tabs from '@common_tabs';
import React from 'react';

const TabsView = (props) => {
    const { data } = props;
    const { smartProductTabs } = props;

    if (smartProductTabs) {
        if (smartProductTabs.tab_1 && smartProductTabs.tab_1.label) {
            data.push({
                title: smartProductTabs.tab_1.label,
                content: smartProductTabs.tab_1.content,
                type: 'html',
            });
        }
        if (smartProductTabs.tab_2 && smartProductTabs.tab_2.label) {
            data.push({
                title: smartProductTabs.tab_2.label,
                content: smartProductTabs.tab_2.content,
                type: 'html',
            });
        }
        if (smartProductTabs.tab_3 && smartProductTabs.tab_3.label) {
            data.push({
                title: smartProductTabs.tab_3.label,
                content: smartProductTabs.tab_3.content,
                type: 'html',
            });
        }
    }

    return (
        <Tabs data={data} tabHasContent {...props} />
    );
};

export default TabsView;
