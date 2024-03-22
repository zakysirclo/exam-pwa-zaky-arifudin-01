/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

const Tabs = (props) => {
    const {
        data = [],
        onChange = () => {},
        activeTabsProps = null,
        allItems = true,
        tabHasContent = false,
        tabWrapperClassName,
        tabTitleWrapperClassName,
        tabTitleClassName,
        tabTitleActiveClassName,
        tabTitleListWrapperClassName,
        tabTitleListClassName,
        tabTitleListActiveClassName,
        tabContentClassName,
    } = props;

    const { t } = useTranslation(['common']);
    const [activeTabs, setActiveTabs] = React.useState(0);
    const usedActive = activeTabsProps !== null ? activeTabsProps : activeTabs;

    const tabClasses = cx(
        'inline-block',
        'py-[12px]',
        'px-[8px]',
        'tablet:min-w-[150px]',
        'hover:text-primary-700',
        'hover:border-b-2',
        'hover:border-primary-700',
        tabTitleClassName,
    );

    const tabActive = cx('border-b-2', 'border-primary-700', 'text-primary-700', tabTitleActiveClassName);

    const handleTabSwitch = (index) => {
        setActiveTabs(index);
    };

    return (
        <>
            <div
                className={cx(
                    'tabs-wrapper',
                    'text-base',
                    'font-medium',
                    'text-center',
                    'text-neutral-700',
                    'border-b-[0.8px]',
                    'border-neutral-300',
                    'overflow-x-auto',
                    'pb-[0.5px]',
                    tabWrapperClassName,
                )}
            >
                <ul className={cx('flex -mb-px', tabTitleWrapperClassName)}>
                    {!tabHasContent && allItems ? (
                        <li>
                            <a
                                className={cx('default-active', 'swift-tab-item', 'min-w-[100px]', tabClasses, tabActive)}
                                onClick={(e) => e.preventDefault()}
                            >
                                {t('common:label:allItems')}
                            </a>
                        </li>
                    ) : null}
                    {data
                        && data.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <li
                                        className={cx(
                                            usedActive === index ? tabTitleListActiveClassName : tabTitleListClassName,
                                            tabTitleListWrapperClassName,
                                        )}
                                        key={index}
                                    >
                                        <a
                                            className={cx(
                                                'swift-tab-item',
                                                !tabHasContent && allItems
                                                    ? cx(tabClasses, 'default-allitems')
                                                    : usedActive === index
                                                        ? cx(tabClasses, tabActive, 'default-active')
                                                        : cx(tabClasses),
                                            )}
                                            onClick={(e) => {
                                                if (tabHasContent) {
                                                    handleTabSwitch(index);
                                                } else {
                                                    onChange(index);
                                                }
                                                e.preventDefault();
                                            }}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                );
                            }
                            return (
                                <li className={cx(usedActive === index ? tabTitleListActiveClassName : tabTitleListClassName)} key={index}>
                                    <a
                                        className={cx(
                                            'swift-tab-item',
                                            !tabHasContent && allItems
                                                ? cx(tabClasses, 'default-allitems')
                                                : usedActive === index
                                                    ? cx(tabClasses, tabActive, 'default-active')
                                                    : cx(tabClasses),
                                        )}
                                        onClick={(e) => {
                                            if (tabHasContent) {
                                                handleTabSwitch(index);
                                            } else {
                                                onChange(index);
                                            }
                                            e.preventDefault();
                                        }}
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                </ul>
            </div>

            {tabHasContent && data && (
                <div className={cx('swift-tab-content-wrapper', 'relative', 'pt-[10px]', tabContentClassName)}>
                    {data.map((item, index) => {
                        if (item.type === 'html') {
                            return (
                                <div
                                    className={cx('tab-content', {
                                        hidden: usedActive !== index,
                                    })}
                                    key={index}
                                >
                                    <div className={cx('description-html', 'text-2md')}>
                                        {item.content ? <CmsRenderer content={item.content} /> : null}
                                    </div>
                                </div>
                            );
                        }
                        if (item.type === 'react-component') {
                            return (
                                <div
                                    className={cx('tab-content', {
                                        hidden: usedActive !== index,
                                    })}
                                    key={index}
                                >
                                    {item.content ? item.content : null}
                                </div>
                            );
                        }
                        return (
                            <div
                                className={cx('tab-content', {
                                    hidden: usedActive !== index,
                                })}
                                key={index}
                            >
                                <div className={cx('description-html', 'text-2md')}>
                                    {/* eslint-disable-next-line react/no-danger */}
                                    {item.content ? <span dangerouslySetInnerHTML={{ __html: JSON.stringify(item?.content) }} /> : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <style jsx>
                {`
                    .tabs-wrapper::-webkit-scrollbar {
                        display: none;
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    
                    .description-html img {
                        width: '100%',
                        height: '100%',
                    }

                    .description-html iframe {
                        width: '100%',
                        height: '100%',
                    }

                    @media screen and (max-width: 768px) {
                        .description-html {
                            width: 320px,
                            height: '100%',
                        }

                        .description-html img {
                            max-width: 300px,
                        }

                        .description-html iframe {
                            max-width: 300px,
                        }
                    }
                    @media screen and (min-width: 769px) and (max-width: 1024px) {
                        .description-html {
                            width: 700px,
                            height: '100%',
                        }

                        .description-html img {
                            max-width: 650px,
                        }

                        .description-html iframe {
                            max-width: 650px,
                        }
                    }
                    @media screen and (min-width: 1025px) {
                        .description-html {
                            width: 850px,
                            height: '100%',
                        }

                        .description-html img {
                            max-width: 800px,
                        }

                        .description-html iframe {
                            max-width: 800px,
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Tabs;
