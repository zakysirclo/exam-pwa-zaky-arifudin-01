/* eslint-disable consistent-return */
import React, { memo } from 'react';
import dynamic from 'next/dynamic';

const WidgetRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer/WidgetRenderer'));
const MagezonRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer/MagezonRenderer'));

const CmsRenderer = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { content, storeConfig } = props;
    if (content.includes('[mgz_pagebuilder]')) {
        return <MagezonRenderer {...props} />;
    }
    return <WidgetRenderer {...props} />;
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.content;

export default memo(CmsRenderer, notRenderIf);
