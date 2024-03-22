/* eslint-disable react/no-danger */
import React from 'react';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';

const MagezonWidget = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, magento_widget, ...other
    } = props;
    let classes = '';
    if (xs_hide) classes += 'hidden-mobile ';
    if (sm_hide) classes += 'hidden-sm ';
    if (md_hide) classes += 'hidden-md ';
    if (lg_hide) classes += 'hidden-lg ';
    return (
        <div className={`magezon-widget ${classes} w-full`}>
            <WidgetRenderer content={magento_widget} {...other} />
            <style jsx>
                {`
                    .magezon-widget {
                        margin-bottom: 20px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonWidget;
