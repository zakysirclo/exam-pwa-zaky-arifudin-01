/* eslint-disable react/no-danger */
import React from 'react';
import cx from 'classnames';

const MagezonRawHtml = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, content,
    } = props;

    return (
        <div
            className={cx('mgz-html', 'flex', 'flex-wrap', {
                'max-sm:hidden': xs_hide,
                'max-md:hidden': sm_hide,
                'max-lg:hidden': md_hide,
                'max-xl:hidden': lg_hide,
            })}
        >
            <div className="magezone-html" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default MagezonRawHtml;
