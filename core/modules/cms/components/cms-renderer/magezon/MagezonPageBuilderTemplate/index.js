import Backdrop from '@common_backdrop';
import MagezonRenderer from '@core_modules/cms/components/cms-renderer/MagezonRenderer';
import { getPageBuilderTemplate } from '@core_modules/cms/services/graphql';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

const MagezonPagebuilderTemplate = (props) => {
    const { template_id } = props;
    const { t } = useTranslation(['common']);
    const { data, loading, error } = getPageBuilderTemplate({ identifier: template_id });

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

    if (data && data.getPageBuilderTemplate.data && data.getPageBuilderTemplate.data.length > 0) {
        const content = data.getPageBuilderTemplate.data;
        return <MagezonRenderer content={content} {...props} />;
    }
    return null;
};

export default MagezonPagebuilderTemplate;
