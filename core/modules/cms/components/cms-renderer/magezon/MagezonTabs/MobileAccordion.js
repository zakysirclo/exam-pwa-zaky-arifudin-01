/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable operator-linebreak */
import { useState } from 'react';

const MobileAccordion = (props) => {
    // prettier-ignore
    const {
        active_tab, elements, gap,
        hide_empty_tab, no_fill_content_area,
        tab_active_background_color, tab_active_border_color, tab_active_color,
        tab_background_color, tab_border_color, tab_color, tab_content_background_color,
        tab_border_radius, tab_border_style, tab_border_width, title_font_size,
        borderRadius, borderWidth, storeConfig,
    } = props;
    const activeTab = active_tab - 1;
    const [expanded, setExpanded] = useState(activeTab);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const TabProps = {
        gap,
        hide_empty_tab,
        no_fill_content_area,
        tab_active_background_color,
        tab_active_border_color,
        tab_active_color,
        tab_background_color,
        tab_border_color,
        tab_color,
        tab_border_radius,
        tab_border_style,
        tab_border_width,
        title_font_size,
        borderRadius,
        borderWidth,
    };

    return null;
    // return (
    //     <>
    //         <div>
    //             {elements.length > 0 &&
    //                 elements.map((element, index) => (
    //                     <Accordion key={index} expanded={expanded === index} onChange={handleExpand(index)}>
    //                         <AccordionSummary expandIcon={<ExpandMoreIcon />} {...TabProps}>
    //                             {element.title}
    //                         </AccordionSummary>
    //                         <AccordionDetails tab_content_background_color={tab_content_background_color}>
    //                             {typeof element.elements === 'object' &&
    //                                 element.elements.map((ele, k) => <MagezonElement key={k} {...ele} storeConfig={storeConfig} />)}
    //                         </AccordionDetails>
    //                     </Accordion>
    //                 ))}
    //         </div>
    //     </>
    // );
};

export default MobileAccordion;
