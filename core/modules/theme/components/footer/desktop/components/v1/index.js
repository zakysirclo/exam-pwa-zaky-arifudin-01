import React from 'react';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { COLORS } from '@core/theme/vars';

const FooterV1 = (props) => {
    const {
        data, loading, storeConfig,
    } = props;
    return (
        <>
            <div className="cms-container wrapper-footer">
                {!loading ? <CmsRenderer content={data.cmsBlocks.items[0].content} storeConfig={storeConfig} /> : null}
                <style jsx global>
                    {`
                        .footer-links a {
                            display: block;
                            margin-bottom: 8px;
                            &:hover {
                                color: ${COLORS.primary.DEFAULT};
                            }
                        }
                        .footer-links br {
                            content: '';
                            display: block;
                            margin-top: 10px;
                            line-height: 22px;
                        }
                    `}
                </style>
            </div>
        </>
    );
};

FooterV1.propTypes = {};

export default FooterV1;
