/* eslint-disable indent */
/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */

import Tabs from '@common_tabs';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon';
import MagezonAccordion from '@core_modules/cms/components/cms-renderer/magezon/MagezonAccordion';
import useMediaQuery from '@hook/useMediaQuery';
import cx from 'classnames';
import { useState } from 'react';

const TabPanel = (props) => {
    const { elements, storeConfig, hide_empty_tab } = props;
    const hideWhenEmpty = hide_empty_tab && elements.length === 0;

    return (
        <>
            {hideWhenEmpty ? null : (
                <div role="tabpanel">
                    {elements.map((element, k) => (
                        <MagezonElement key={k} {...element} storeConfig={storeConfig} />
                    ))}
                </div>
            )}
        </>
    );
};

const MagezonTabs = (props) => {
    const {
        active_tab,
        elements,
        gap,
        hide_empty_tab,
        mobile_accordion,
        no_fill_content_area,
        spacing,
        tab_active_background_color,
        tab_active_border_color,
        tab_active_color,
        tab_background_color,
        tab_border_color,
        tab_color,
        tab_content_background_color,
        tab_hover_background_color,
        tab_hover_border_color,
        tab_hover_color,
        tab_border_radius,
        tab_border_style,
        tab_border_width,
        tab_position,
        storeConfig,
    } = props;
    const tab_align = 'top';
    const alignVertical = tab_align === 'right' || tab_align === 'left';
    const [activeTab] = useState(active_tab - 1);
    const isVertical = tab_position === 'left' || tab_position === 'right';
    const borderRadius = tab_border_radius ? `${tab_border_radius}px` : '5px';
    const borderWidth = tab_border_width ? `${tab_border_width}px` : '1px';
    const contentBgColor = tab_content_background_color || '#f8f8f8';
    const { isMobile } = useMediaQuery();

    const tabData = elements.map((_el, idx) => ({
        title: _el.title,
        content: (
            <div className="tab-body">
                <TabPanel
                    key={idx}
                    elements={typeof _el.elements === 'object' ? _el.elements : []}
                    value={activeTab}
                    index={idx}
                    storeConfig={storeConfig}
                    hide_empty_tab={hide_empty_tab}
                />
            </div>
        ),
        type: 'react-component',
    }));

    return (
        <>
            <div className="mgz-tabs">
                {!(isMobile && mobile_accordion) ? (
                    <div className={cx('tabs')}>
                        <Tabs
                            data={tabData}
                            allItems={false}
                            tabHasContent
                            tabWrapperClassName={cx('cursor-pointer', {
                                '!border-b-[0px]': alignVertical,
                            })}
                            tabTitleClassName={cx('mgz-tab')}
                            tabTitleActiveClassName={cx('mgz-tab-active')}
                            tabContentClassName={cx('!pt-0')}
                        />
                    </div>
                ) : (
                    <MagezonAccordion {...props} />
                )}
            </div>
            <style jsx>
                {`
                    .mgz-tabs :global(li a) {
                        border-bottom: none;
                    }
                    .mgz-tabs :global(li) {
                        background-color: ${tab_background_color || '#ebebeb'};
                        color: ${tab_color || 'initial'};
                        margin-right: ${alignVertical && spacing ? `${spacing}px` : '5px'};
                        margin-bottom: ${gap ? `${gap}px` : '0'};
                        ${alignVertical && spacing ? `margin-bottom: ${spacing ? `${spacing}px` : '5px'};` : ''};
                        min-width: 100px;
                        border: ${borderWidth} ${tab_border_style || 'solid'} ${tab_border_color || '#e3e3e3'};
                        border-bottom: ${no_fill_content_area || gap ? `${borderWidth} solid #e3e3e3` : 'none'};
                        border-radius: ${no_fill_content_area || gap ? borderRadius : `${borderRadius} ${borderRadius} 0 0`};
                        ${alignVertical
                            ? `border-radius: ${no_fill_content_area || gap ? borderRadius : `${borderRadius} 0 0 ${borderRadius} `};`
                            : ''}
                    }
                    .mgz-tabs :global(li:last-child) {
                        margin-right: ${isVertical ? (spacing ? `${spacing}px` : '5px') : 0};
                    }
                    .mgz-tabs :global(li:hover) {
                        background-color: ${tab_hover_background_color || '#f8f8f8'};
                        border-color: ${tab_hover_border_color || '#e3e3e3'};
                        color: ${tab_hover_color || '#000000'};
                    }
                    .mgz-tabs :global(li:has(.mgz-tab-active)) {
                        background-color: ${tab_active_background_color || '#f8f8f8'};
                        border-color: ${tab_active_border_color || '#e3e3e3'};
                        color: ${tab_active_color || '#000000'};
                    }
                    .mgz-tabs :global(li:has(.mgz-tab-active):hover) {
                        background-color: ${tab_active_background_color || '#f8f8f8'};
                        border-color: ${tab_active_border_color || '#e3e3e3'};
                        color: ${tab_active_color || '#000000'};
                    }
                    .mgz-tabs :global(.tab-body) {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        min-width: 0;
                        background-color: ${no_fill_content_area || activeTab < 0 ? 'transparent' : contentBgColor};
                        border: ${no_fill_content_area || activeTab < 0 ? 'none' : `${borderWidth} solid #e3e3e3`};
                        ${no_fill_content_area || gap || activeTab < 0 ? '' : 'border-top: none;'}
                        border-radius: ${no_fill_content_area || gap || activeTab < 0 ? borderRadius : `0 0 ${borderRadius} ${borderRadius}`};
                        ${activeTab >= 0 ? 'padding: 20px;' : ''}
                        ${alignVertical ? 'min-height: 100px' : ''};
                        ${alignVertical ? 'width: 100vw' : ''}
                    }
                    .tabs {
                        ${alignVertical ? 'display: flex;' : ''}
                    }
                    .mgz-tabs :global(.tabs-wrapper ul) {
                        ${alignVertical ? 'flex-direction: column;' : ''}
                    }
                    .mgz-tabs :global(li .mgz-tab-active) {
                        border-bottom-width: 1px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonTabs;
