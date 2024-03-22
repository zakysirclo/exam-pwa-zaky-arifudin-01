/* eslint-disable radix */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable operator-linebreak */

import Typography from '@common_typography';
import Heading from '@core_modules/cms/components/cms-renderer/magezon/components/commons/heading';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezonIcon';
import MagezonSection from '@core_modules/cms/components/cms-renderer/magezon/MagezonSection';
import { useState } from 'react';
import Accordion from '@common/Accordion';
import cx from 'classnames';

const MagezonAccordion = (props) => {
    const {
        active_icon,
        icon,
        accordion_icon,
        active_sections,
        at_least_one_open,
        description,
        elements,
        gap,
        icon_position,
        no_fill_content_area,
        section_active_background_color,
        section_active_border_color,
        section_active_color,
        section_align,
        section_border_style,
        section_background_color,
        section_border_color,
        section_color,
        section_hover_background_color,
        section_hover_border_color,
        section_hover_color,
        section_content_background_color,
        spacing,
        line_color,
        line_position,
        line_width,
        show_line,
        title,
        title_align,
        title_tag,
        title_color,
        title_font_size,
        storeConfig,
    } = props;
    const accordionsState = {};
    let ExpandMoreIcon;
    let ExpandLessIcon;
    if (elements.length > 0) {
        elements.forEach((_, index) => {
            accordionsState[`accordion-${index}`] = false;
            if (active_sections) {
                const activeSections = active_sections
                    .replace(/\s+/g, '')
                    .split(',')
                    .map((active) => parseInt(active) - 1);
                if (activeSections.length > 0) {
                    activeSections.forEach((section) => {
                        accordionsState[`accordion-${section}`] = true;
                    });
                }
            }
        });
    }
    const [expandedList, setExpandedList] = useState(accordionsState);

    if (accordion_icon === 'chevron') {
        ExpandMoreIcon = undefined;
        ExpandLessIcon = undefined;
    } else if (accordion_icon === 'triangle') {
        ExpandMoreIcon = <MagezonIcon icon="fas fa-caret-down" />;
        ExpandLessIcon = <MagezonIcon icon="fas fa-caret-up" />;
    } else if (accordion_icon === 'dot') {
        ExpandMoreIcon = <MagezonIcon icon="far fa-circle" />;
        ExpandLessIcon = <MagezonIcon icon="fas fa-circle" />;
    } else if (accordion_icon === 'plus' || accordion_icon === 'custom') {
        ExpandMoreIcon = <MagezonIcon icon={icon} />;
        ExpandLessIcon = <MagezonIcon icon={active_icon} />;
    }

    const headingProps = {
        description,
        title,
        title_align,
        title_tag,
        title_color,
        line_color,
        line_position,
        line_width,
        show_line,
    };

    const handleExpand = (panel) => {
        Object.keys(expandedList).forEach((list) => {
            if (list === panel) {
                const countOpen = Object.keys(expandedList).filter((item) => expandedList[item] === true).length;
                setExpandedList({ ...expandedList, [list]: !expandedList[list] });
                if (at_least_one_open && expandedList[list] && countOpen === 1) {
                    // one must stay opened
                    setExpandedList({ ...expandedList, [list]: true });
                } else {
                    // default
                    setExpandedList({ ...expandedList, [list]: !expandedList[list] });
                }
            }
        });
    };

    return (
        <>
            <div className="mgz-accordion">
                <Heading {...headingProps} />
                <div className="mgz-accordion-content">
                    {elements.length > 0 &&
                        elements.map((element, index) => {
                            return (
                                <Accordion
                                    key={index}
                                    open={expandedList[`accordion-${index}`]}
                                    handleOpen={() => handleExpand(`accordion-${index}`)}
                                    handleClose={() => handleExpand(`accordion-${index}`)}
                                    label={<Typography variant={title_tag} className="accordion-title">{element.title}</Typography>}
                                    classLabel={cx('accordion-label', {
                                        '[&.accordion-label]:ml-[5px]': icon_position === 'left',
                                    })}
                                    classSummary={cx('accordion-summary', {
                                        '!flex-row-reverse !justify-end': icon_position === 'left',
                                        '!flex-row': icon_position === 'right',
                                    })}
                                    classContent="accordion-content"
                                    CustomIcon={expandedList[`accordion-${index}`] ? ExpandLessIcon : ExpandMoreIcon}
                                >
                                    <MagezonSection elements={element.elements} storeConfig={storeConfig} />
                                </Accordion>
                            );
                        })}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-accordion :global(.accordion-summary) {
                        color: #333;
                        border: none;
                        transition:
                            background-color 0.4s ease-in-out,
                            color 0.4s ease-in-out;
                    }
                    .mgz-accordion :global(.common-accordion) {
                        ${gap ? `margin-bottom: ${gap}px;` : ''}
                    }
                    .mgz-accordion :global(.accordion-summary) {
                        background-color: ${section_background_color || '#f8f8f8'};
                        ${!no_fill_content_area ? `border: 1px solid ${section_active_border_color || '#eee'};` : ''}
                        border: 1px ${section_border_style || 'solid'} ${section_border_color || '#eee'};
                        padding: 14px;
                    }
                    .mgz-accordion :global(.accordion-summary:hover) {
                        ${section_hover_background_color ? `background-color: ${section_hover_background_color} !important;` : ''}
                        ${section_hover_border_color ? `border-color: ${section_hover_border_color} !important;` : ''}
                    }
                    .mgz-accordion :global(.accordion-summary:hover i) {
                        ${section_hover_background_color ? `background-color: ${section_hover_background_color} !important;` : ''}
                    }
                    .mgz-accordion :global(details[open] .accordion-summary) {
                        border: 1px ${section_border_style || 'solid'} ${section_active_border_color || '#eee'};
                        ${section_active_background_color ? `background-color: ${section_active_background_color}` : ''}
                    }
                    .mgz-accordion :global(details[open] .accordion-summary i) {
                        ${section_active_background_color ? `background-color: ${section_active_background_color}` : ''}
                    }
                    .mgz-accordion :global(.accordion-content) {
                        justify-content: ${section_align === 'left' ? 'flex-start' : section_align === 'center' ? 'center' : 'flex-end'};
                        padding: 14px 20px;
                        margin-top: unset;
                        ${section_content_background_color ? `background-color: ${section_content_background_color}` : ''}
                    }
                    .mgz-accordion :global(*[class*='Typography']) {
                        color: ${section_color || '#000000'};
                        ${title_font_size ? `font-size: ${title_font_size}px` : ''}
                    }
                    .mgz-accordion :global(.accordion-summary .accordion-title) {
                        color: ${section_active_color || '#000000'};
                    }
                    .mgz-accordion :global(.accordion-summary:hover .accordion-title) {
                        color: ${section_hover_color || '#000000'};
                    }
                    .mgz-accordion :global(.accordion-content) {
                        ${spacing ? `margin-top: ${spacing}px;` : ''}
                    }
                    .mgz-accordion :global(.magezon-icon i) {
                        font-size: 14px;
                        color: var(--color-pwa-font_color);
                    }
                `}
            </style>
        </>
    );
};

export default MagezonAccordion;
