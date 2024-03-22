/* eslint-disable no-nested-ternary */
import MagezonColumn from '@core_modules/cms/components/cms-renderer/magezon/MagezonColumn';
import magezonDesignOptionsCss from '@core_modules/cms/helpers/magezonDesignOptionsCss';
import cx from 'classnames';
import React from 'react';

const MagezonRow = (props) => {
    const {
        //
        elements,
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        storeConfig,
        max_width,
        content_align,
        row_type,
        ...other
    } = props;
    const isContained = row_type === 'contained';
    const isFullWidth = row_type.indexOf('full_width') !== -1;
    const { className, styles } = magezonDesignOptionsCss('mgz-row', { ...other });

    return (
        <>
            <div
                className={cx({
                    'w-full': isFullWidth,
                    'desktop:max-w-screen-desktop desktop:px-10 tablet:max-w-screen-tablet tablet:px-6 mobile:px-4 my-0 mx-auto': isContained,
                })}
            >
                <div
                    className={cx(
                        'mgz-row relative',
                        'flex',
                        'flex-wrap',
                        row_type,
                        className,
                        {
                            'mgz-element-row-max-width': max_width && max_width !== '',
                            'max-sm:hidden': xs_hide,
                            'max-md:hidden': sm_hide,
                            'max-lg:hidden': md_hide,
                            'max-xl:hidden': lg_hide,
                        },
                    )}
                >
                    {elements && elements.length > 0 && elements.map((item, key) => <MagezonColumn key={key} {...item} storeConfig={storeConfig} />)}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-element-row-max-width {
                        width: ${max_width}px;
                        max-width: 100%;
                        margin: ${content_align === 'left' ? 'auto 0 0 0' : content_align === 'center' ? 'auto' : '0 0 0 auto'};
                    }
                `}
            </style>
            {styles}
        </>
    );
};

export default MagezonRow;
