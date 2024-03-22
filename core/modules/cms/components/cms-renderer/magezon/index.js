/* eslint-disable max-len */
/* eslint-disable react/no-unknown-property */
import generateCustomCssAnimation from '@core_modules/cms/helpers/magezonCustomCssAnimationGenerator';
import magezonDesignOptionsCss from '@core_modules/cms/helpers/magezonDesignOptionsCss';
import dynamic from 'next/dynamic';
import React from 'react';
import cx from 'classnames';

const MagezonSlider = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSlider'));
const MagezonCaraousel = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonCaraousel'), { ssr: false });
const MagezonColumn = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonColumn'));
const MagezonRow = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonRow'));
const MagezonHeading = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonHeading'));
const MagezonSingleImage = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage'));
const MagezonText = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonText'));
const MagezonButton = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonButton'));
const MagezonRawHtml = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonRawHtml'), { ssr: false });
const MagezonWidget = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonWidget'), { ssr: false });
const MagezonIcon = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonIcon'), { ssr: false });
const MagezonSeparator = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSeparator'), { ssr: false });
const MagezonEmpty = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonEmpty'), { ssr: false });
const MagezonToggle = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonToggle'), { ssr: false });
const MagezonNewsletter = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonNewsletter'), { ssr: true });
const MagezonContactForm = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonContactForm'), { ssr: false });
const MagezonSearchForm = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSearchForm'), { ssr: false });
const MagezonStaticBlock = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonStaticBlock'));
const MagezonPagebuilderTemplate = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonPageBuilderTemplate'), {
    ssr: false,
});
const MagezonVideoPlayer = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonVideoPlayer'), { ssr: false });
const MagezonImageGallery = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonImageGallery'), { ssr: false });
const MagezonRecentReviews = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonRecentReviews'), { ssr: false });
const MagezonGoogleMaps = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonGoogleMaps'), { ssr: false });
const MagezonAccordion = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonAccordion'), { ssr: false });
const MagezonSection = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSection'), { ssr: false });
const MagezonProduct = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonProduct'));

const MagezonInstagram = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed'), { ssr: false });
const MagezonParallax = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonParallax'), { ssr: false });
const MagezonTabs = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonTabs'), { ssr: false });

const MagezonElement = (props) => {
    const {
        align,
        type,
        content,
        animation_in,
        animation_duration,
        animation_delay,
        animation_infinite,
        parallax_type,
        parallax_speed,
        mouse_parallax,
        mouse_parallax_size,
        mouse_parallax_speed,
        background_image,
        full_height,
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        xl_hide,
        hidden_default,
        disable_element,
        el_class,
        el_id,
        el_inner_class,
        storeConfig,
        id,
        ...other
    } = props;
    const { base_media_url } = storeConfig;
    let childrenContent;
    let classes = 'mgz-element inline-block ';
    let customId = '';
    let innerClasses = 'mgz-element-inner ';
    const { className, styles } = generateCustomCssAnimation(animation_duration, animation_delay, animation_infinite);
    const { className: designOptionClassName, styles: designOptionStyles } = magezonDesignOptionsCss(id, { ...other, type });

    // console.log('props', props);

    const enumCustomAnimation = {
        topToBottom: 'mgz_top-to-bottom',
        bottomToTop: 'mgz_bottom-to-top',
        leftToRight: 'mgz_left-to-right',
        rightToLeft: 'mgz_right-to-left',
        appear: 'mgz_appear',
        backSlideIn: 'owl-backSlide-in',
        fadeUpIn: 'owl-fadeUp-in',
        goDownIn: 'owl-goDown-in',
    };

    if (el_class) {
        classes += `${el_class}`;
    }

    if (el_id) {
        customId += `${el_id}`;
    }

    if (el_inner_class) {
        innerClasses += `${el_inner_class}`;
    }

    if (full_height) {
        classes += 'full_height ';
    }

    if (disable_element) return null;

    if (xs_hide) classes += 'max-sm:hidden ';
    if (sm_hide) classes += 'max-md:hidden ';
    if (md_hide) classes += 'max-lg:hidden ';
    if (lg_hide) classes += 'max-xl:hidden ';
    if (xl_hide) classes += 'xl:hidden ';

    if (hidden_default) classes += 'hidden-default ';

    if (animation_in) {
        if (!Object.values(enumCustomAnimation).includes(animation_in)) {
            // base CSS animation using animate.css class and utility class
            classes += `animate__animated animate__${animation_in}`;
            if (animation_delay) {
                classes += ` animate__delay-${animation_delay}s`;
            }
            if (animation_infinite) {
                classes += ' animate__infinite';
            }
            if (animation_duration) {
                classes += ' animation_duration';
            }
        } else {
            // custom CSS animation
            classes += `${animation_in} ${className}`;
            if (animation_duration || animation_delay || animation_infinite) {
                classes += ' custom_animation';
            }
        }
    }

    React.useEffect(() => {
        if (type && type === 'raw_js' && content && content !== '' && content.includes('<script>')) {
            if (typeof window !== 'undefined') {
                let code = content.replace('<script>', '');
                code = code.replace('</script>', '');
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.innerHTML = code;
                document.body.appendChild(script);
            }
        }
    }, [props]);

    if (type) {
        switch (type) {
        case 'row':
            childrenContent = <MagezonRow {...props} />;
            break;
        case 'column':
            childrenContent = <MagezonColumn {...props} />;
            break;
        case 'heading':
            childrenContent = <MagezonHeading {...props} />;
            break;
        case 'single_image':
            childrenContent = <MagezonSingleImage {...props} />;
            break;
        case 'text':
            childrenContent = <MagezonText {...props} />;
            break;
        case 'button':
            childrenContent = <MagezonButton {...props} />;
            break;
        case 'raw_html':
            childrenContent = <MagezonRawHtml {...props} />;
            break;
        case 'magento_widget':
            childrenContent = <MagezonWidget {...props} />;
            break;
        case 'instagram':
            childrenContent = <MagezonInstagram {...props} />;
            break;
        case 'icon':
            childrenContent = <MagezonIcon {...props} />;
            break;
        case 'separator':
            childrenContent = <MagezonSeparator {...props} />;
            break;
        case 'empty_space':
            childrenContent = <MagezonEmpty {...props} />;
            break;
        case 'toggle':
            childrenContent = <MagezonToggle {...props} />;
            break;
        case 'newsletter_form':
            childrenContent = <MagezonNewsletter {...props} />;
            break;
        case 'contact_form':
            childrenContent = <MagezonContactForm {...props} />;
            break;
        case 'static_block':
            childrenContent = <MagezonStaticBlock {...props} />;
            break;
        case 'slider':
            childrenContent = <MagezonSlider {...props} />;
            break;
        case 'image_carousel':
            childrenContent = <MagezonCaraousel {...props} />;
            break;
        case 'search_form':
            childrenContent = <MagezonSearchForm {...props} />;
            break;
        case 'pagebuilder_template':
            childrenContent = <MagezonPagebuilderTemplate {...props} />;
            break;
        case 'video':
            childrenContent = <MagezonVideoPlayer {...props} />;
            break;
        case 'image_gallery':
            childrenContent = <MagezonImageGallery {...props} />;
            break;
        case 'recent_reviews':
            childrenContent = <MagezonRecentReviews {...props} />;
            break;
        case 'single_product':
            childrenContent = <MagezonProduct {...props} />;
            break;
        case 'product_list':
            childrenContent = <MagezonProduct {...props} />;
            break;
        case 'product_grid':
            childrenContent = <MagezonProduct {...props} />;
            break;
        case 'product_slider':
            childrenContent = <MagezonProduct {...props} />;
            break;
        case 'gmaps':
            childrenContent = <MagezonGoogleMaps {...props} />;
            break;
        case 'section':
            childrenContent = <MagezonSection {...props} />;
            break;
        case 'accordion':
            childrenContent = <MagezonAccordion {...props} />;
            break;
        case 'tabs':
            childrenContent = <MagezonTabs {...props} />;
            break;
        default:
            childrenContent = null;
        }
    }

    return (
        <>
            <div className={classes} id={customId || null}>
                <div className={cx(innerClasses, id, designOptionClassName)}>
                    {background_image && (
                        <>
                            <div className="parallax-wrapper mouse-parallax">
                                <MagezonParallax
                                    src={`${base_media_url}${background_image}`}
                                    speed={parallax_speed}
                                    type={parallax_type}
                                    mouseParallax={mouse_parallax}
                                    mouseSize={mouse_parallax_size}
                                />
                            </div>
                        </>
                    )}
                    {childrenContent}
                </div>
            </div>
            {/* prettier-ignore */}
            <style jsx>
                {`
                    .mgz-element {
                        ${align ? `text-align: ${align};` : ''}
                        position: relative;
                        width: 100%;
                        box-sizing: border-box;
                    }
                    @media screen and (max-width: 360px) {
                        .full_height {
                            min-height: ${Math.round(storeConfig.pwa.magezon_slider_mobile_width * 0.8)}px;
                        }
                    }
                    @media screen and (min-width: 361px) and (max-width: 383px) {
                        .full_height {
                            min-height: ${Math.round(storeConfig.pwa.magezon_slider_mobile_width * 0.9)}px;
                        }
                    }
                    @media screen and (min-width: 384px) and (max-width: 479px) {
                        .full_height {
                            min-height: ${Math.round(storeConfig.pwa.magezon_slider_mobile_width * 0.95)}px;
                        }
                    }
                    @media screen and (min-width: 480px) and (max-width: 767px) {
                        .full_height {
                            min-height: ${Math.round(storeConfig.pwa.magezon_slider_mobile_width * 1.25)}px;
                        }
                    }
                    @media screen and (min-width: 768px) and (max-width: 800px) {
                        .full_height {
                            min-height: ${storeConfig.pwa.magezon_slider_mobile_height}px;
                        }
                    }
                    @media screen and (min-width: 801px) {
                        .full_height {
                            min-height: 433px;
                        }
                    }
                    .hidden-default {
                        display: none;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    @media screen and (max-width: 768px) {
                        .mgz-element.full_height > .mgz-element-inner >  .mgz-row > .mgz-column > .mgz-element {
                            margin-top: -15px;
                            position: absolute;
                        }

                        .mgz-element > .mgz-element-inner > div > p {
                            margin: 0px !important;
                            padding: 0px !important;
                        }
                    }

                    @media screen and (min-width: 1200px) {
                        .mgz-element.full_height > .mgz-element-inner > .mgz-row > .mgz-column > .mgz-element {
                            padding-top: 0px !important;
                            padding-left: 0px !important;
                            padding-right: 0px !important;
                            padding-bottom: 0px !important
                        }
                    }

                    .animation_duration {
                        --animate-duration: ${animation_duration || 0.5}s;
                    }
                    .parallax-wrapper {
                        border-radius: inherit;
                        position: absolute;
                        top: 0;AAA
                        bottom: 0;
                        right: 0;
                        left: 0;
                        overflow: hidden;
                        // pointer-events: none;
                    }
                    .parallax-wrapper * {
                        position: absolute;
                    }
                    .parallax-wrapper.mouse-parallax {
                        transform: translateX(0);
                    }
                    .jarallax {
                        inset: -${mouse_parallax_size}px;
                        transition: transform ${mouse_parallax_speed}ms cubic-bezier(0.22, 0.63, 0.6, 0.88) 0s;

                        background-image: none;
                        background-size: auto;
                        background-position: center top;
                        background-repeat: no-repeat;
                    }
                    .jarallax * {
                        background-size: inherit !important;
                        background-position: inherit !important;
                        background-repeat: inherit !important;
                    }
                `}
            </style>
            {styles}
            {designOptionStyles}
        </>
    );
};

export default MagezonElement;
