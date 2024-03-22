/* eslint-disable consistent-return */
import React, { memo, useMemo } from 'react';
import parse, { domToReact } from 'html-react-parser';
import dynamic from 'next/dynamic';
import Alert from '@common/Alert';
import { useTranslation } from 'next-i18next';
import cx from 'classnames';

const WidgetSlider = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-slider'));
const ImageRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer/image-renderer'));
const Newsletter = dynamic(() => import('@plugin_newsletter'));
const WidgetListProduct = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-list-product'));
const WidgetListBrand = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-list-brand'));
const WidgetPwaLink = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-link-pwa'));
const LinkRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer/LinkRenderer'));

const TYPE_PWA_SLIDER = 'pwa-slider';
const TYPE_PWA_FEATURED = 'pwa-featured-brands';
const TYPE_PWA_PAGELINK = 'pwa-cms-page-link';
const TYPE_PWA_PRODUCT = 'pwa-catalog-products-list';
const TYPE_PWA_NEWSLETTER = 'pwa-newsletter-subscribe';

const DOM_NAME = 'pwa';

const WidgetRenderer = (props) => {
    const {
        content, storeConfig, underlinedLink, applyProse, skipTags = [], className,
    } = props;
    const { t } = useTranslation(['common']);

    const widgetContent = useMemo(() => {
        if (content?.includes('widget')) {
            const newWidgetContent = content.replace('<p>', '').replace('{{widget', '<pwa');
            let lastOccurenceIndex;
            if (newWidgetContent.endsWith('}}')) {
                lastOccurenceIndex = newWidgetContent.lastIndexOf('}}');
            }

            // handles pwa-catalog-products-list differently because the string it outputs is different
            if (newWidgetContent.indexOf(TYPE_PWA_PRODUCT) !== -1 && newWidgetContent.endsWith('"}}')) {
                lastOccurenceIndex = newWidgetContent.lastIndexOf('"}}');
            }
            return `${newWidgetContent.substring(0, lastOccurenceIndex)}/>`;
        }
        return content;
    }, []);

    React.useEffect(() => {
        const coll = document.getElementsByClassName('collapsible');
        let i;
        setTimeout(() => {
            if (coll[0]) {
                coll[0].classList.toggle('active');
                const contentCMS = coll[0].nextElementSibling;
                if (contentCMS.style.maxHeight) {
                    contentCMS.style.maxHeight = null;
                } else {
                    contentCMS.style.maxHeight = `${contentCMS.scrollHeight}px`;
                }
            }
        }, 1000);
        /* eslint-disable */
        for (i = 0; i < coll.length; i += 1) {
            coll[i].addEventListener('click', function () {
                this.classList.toggle('active');
                var contentCMS = this.nextElementSibling;
                if (contentCMS.style.maxHeight) {
                    contentCMS.style.maxHeight = null;
                } else {
                    contentCMS.style.maxHeight = contentCMS.scrollHeight + 'px';
                }
            });
        }
        /* eslint-enable */
    });

    /**
     * component conversion
     * NOTES*: validateDOMNesting(...): <div> cannot appear as a descendant of <p>
     * parent cms page || block must start with <div>
     * @returns {COMPONENT}
     */
    /* eslint-disable */
    const WidgetComponent = () => {
        return parse(widgetContent, {
            replace: (domNode) => {
                if (skipTags.length > 0 && skipTags.some((tag) => tag === domNode.name)) {
                    return <span />;
                }
                if (domNode.name === 'img') {
                    return <ImageRenderer storeConfig={storeConfig} domNode={domNode} />;
                }
                if (domNode.name === 'a' && domNode.attribs?.href) {
                    return <LinkRenderer domNode={domNode} />;
                }

                if (domNode.name === DOM_NAME && domNode.attribs) {
                    const propsWidget = domNode.attribs;

                    switch (domNode.attribs.type) {
                        case TYPE_PWA_SLIDER:
                            return <WidgetSlider {...propsWidget} storeConfig={storeConfig} />;
                        case TYPE_PWA_FEATURED:
                            return <WidgetListBrand {...propsWidget} />;
                        case TYPE_PWA_PAGELINK:
                            return <WidgetPwaLink {...propsWidget} />;
                        case TYPE_PWA_PRODUCT:
                            return <WidgetListProduct {...propsWidget} storeConfig={storeConfig} />;
                        case TYPE_PWA_NEWSLETTER:
                            return <Newsletter {...propsWidget} storeConfig={storeConfig} />;
                        default:
                            return <div>Unable to render the content!</div>;
                    }
                }

                if (domNode.attribs) {
                    if (domNode.attribs.class === 'acctitle') {
                        return (
                            <button type="button" className="collapsible">
                                {domToReact(domNode.children, domNode)}
                            </button>
                        );
                    } else if (domNode.attribs.class === 'acc_content clearfix') {
                        return <div className="content-collapsible">{domToReact(domNode.children, domNode)}</div>;
                    }
                }
            },
        });
    };
    /* eslint-enable */

    return (
        <div
            className={cx(className, {
                prose: applyProse,
                'prose-a:no-underline': applyProse && underlinedLink,
            })}
        >
            {content ? (
                <WidgetComponent {...props} />
            ) : (
                <div className="desktop:min-w-[1200px] tablet:min-w-[720px]">
                    <Alert severity="error" className="capitalize">
                        {t('common:cms:unableToRender')}
                    </Alert>
                </div>
            )}
        </div>
    );
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.content;

export default memo(WidgetRenderer, notRenderIf);
