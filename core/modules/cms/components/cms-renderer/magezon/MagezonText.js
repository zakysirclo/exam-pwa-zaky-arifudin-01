/* eslint-disable react/no-danger */
import React from 'react';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';

const MagezonText = (props) => {
    const { content, ...other } = props;
    const underlinedLink = props?.el_class === 'prose-a:no-underline';

    return (
        <div className="mgz-text">
            <WidgetRenderer applyProse content={content} underlinedLink={underlinedLink} {...other} />
            <style jsx>
                {`
                    .mgz-text {
                        width: 100%;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonText;
