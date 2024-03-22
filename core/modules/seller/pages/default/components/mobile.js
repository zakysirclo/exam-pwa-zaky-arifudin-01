/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Banner from '@common_slick/Banner';
import useMediaQuery from '@root/core/hooks/useMediaQuery';

function MobileContent(props) {
    const { data, storeConfig } = props;
    const { isDesktop } = useMediaQuery();

    return (
        <div className="flex flex-col gap-5">
            {data && data.map((item) => {
                switch (item.type) {
                case 'carousel':
                    const dataBanner = item.widgets && item.widgets.map((widget) => ({
                        imageUrl: widget.type === 'image' ? widget.url : '',
                        link: widget.type === 'image' ? widget.hyperlink : '',
                        urlEmbed: widget.type === 'video' ? widget.url : '',
                    }));
                    return (
                        <div className="h-max w-full">
                            <Banner
                                data={dataBanner}
                                showArrow={isDesktop}
                                storeConfig={storeConfig}
                                height={318}
                                width={480}
                            />
                        </div>
                    );
                case 'single':
                    return (
                        <div className="flex flex-row">
                            {
                                item.widgets && item.widgets.length > 0 && (
                                    item.widgets[0].type === 'image'
                                        ? (
                                            <div className="basis-full" style={{ margin: 'auto' }}>
                                                <Link href={item.widgets[0].hyperlink ? item.widgets[0].hyperlink : '/#'}><img src={item.widgets[0].url} width="100%" alt="img" /></Link>
                                            </div>
                                        )
                                        : (
                                            <div className="basis-full" style={{ width: '100%' }}>
                                                <iframe width="100%" height="600px" src={item.widgets[0].url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                            </div>
                                        )
                                )
                            }
                        </div>
                    );
                case 'image' || 'two_columns':
                    return (
                        <div className="flex flex-row">
                            {
                                item.widgets && item.widgets.length > 0 && (
                                    item.widgets.map((widget) => (
                                        widget.type === 'image'
                                            ? (
                                                <div className="basis-full" style={{ margin: 'auto' }}>
                                                    <Link href={widget.hyperlink ? widget.hyperlink : '/#'}>

                                                        <img src={widget.url} width="100%" className="" alt="img" />

                                                    </Link>
                                                </div>
                                            )
                                            : (
                                                <div className="basis-full">
                                                    <iframe width="100%" height="600px" src={widget.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                                </div>
                                            )
                                    ))
                                )
                            }
                        </div>
                    );
                case 'video':
                    return (
                        <div className="flex flex-row">
                            {
                                item.widgets && item.widgets.length > 0 && (
                                    <div className={classNames('basis-full', '')} style={{ width: '100%' }}>
                                        <iframe className="video-iframe" width="100%" height="600px" src={item.widgets[0].url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                    </div>
                                )
                            }
                        </div>
                    );
                default:
                    return null;
                }
            })}
        </div>
    );
}

export default MobileContent;
