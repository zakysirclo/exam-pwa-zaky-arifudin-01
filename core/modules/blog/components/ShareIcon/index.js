/* eslint-disable no-nested-ternary */
import React from 'react';
import { shareIconConfig } from '@services/graphql/repository/pwa_config';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';

const ShareComp = ({ url }) => {
    let shareIcon = {};

    const { data, loading } = shareIconConfig();

    if (!loading && data && data.storeConfig && data.storeConfig.pwa) {
        shareIcon = {
            ...data.storeConfig.pwa,
        };
    }

    const icons = Object.entries(shareIcon);
    return (
        <div className="flex flex-row justify-around">
            {icons.map((item, key) => (item[0] === 'share_icon_facebook' && item[1] === true ? (
                <FacebookShareButton url={url} key={key} className="mr-[10px]">
                    <FacebookIcon size={16} />
                </FacebookShareButton>
            ) : item[0] === 'share_icon_twitter' && item[1] === true ? (
                <TwitterShareButton url={url} key={key} className="mr-[10px]">
                    <TwitterIcon size={16} />
                </TwitterShareButton>
            ) : item[0] === 'share_icon_line' && item[1] === true ? (
                <LineShareButton url={url} key={key} className="mr-[10px]">
                    <LineIcon size={16} />
                </LineShareButton>
            ) : item[0] === 'share_icon_pinterest' && item[1] === true ? (
                <PinterestShareButton url={url} key={key} className="mr-[10px]">
                    <PinterestIcon size={16} />
                </PinterestShareButton>
            ) : item[0] === 'share_icon_telegram' && item[1] === true ? (
                <TelegramShareButton url={url} key={key} className="mr-[10px]">
                    <TelegramIcon size={16} />
                </TelegramShareButton>
            ) : item[0] === 'share_icon_email' && item[1] === true ? (
                <EmailShareButton url={url} key={key} className="mr-[10px]">
                    <EmailIcon size={16} />
                </EmailShareButton>
            ) : (
                item[0] === 'share_icon_linkedin'
                    && item[1] === true && (
                    <LinkedinShareButton url={url} key={key} className="mr-[10px]">
                        <LinkedinIcon size={16} />
                    </LinkedinShareButton>
                )
            )))}
        </div>
    );
};

export default ShareComp;
