import Backdrop from '@common_backdrop';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { getCmsBlocks } from '@core_modules/cms/services/graphql';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

const MagezonStaticBlock = (props) => {
    const { block_id, ...other } = props;
    const { t } = useTranslation(['common']);

    const { data, loading, error } = getCmsBlocks({ identifiers: [block_id] });

    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                text: t('common:error:fetchError'),
                variant: 'error',
                position: 'bottom-right',
            });
        }
    }, [error]);

    if (loading) {
        return <Backdrop open={loading} />;
    }

    if (data && data.cmsBlocks && data.cmsBlocks.items && data.cmsBlocks.items.length > 0) {
        return <CmsRenderer content={data.cmsBlocks.items[0].content} {...other} />;
    }
    return null;
};

export default MagezonStaticBlock;
