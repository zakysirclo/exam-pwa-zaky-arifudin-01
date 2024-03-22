/* eslint-disable consistent-return */
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Alert from '@common/Alert';

const MagezonElement = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/index'));
const WidgetRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer/WidgetRenderer'));

const MixedContent = (props) => {
    const {
        key, storeConfig, contents, ...item
    } = props;

    return (
        <>
            {contents[0] !== '' && <WidgetRenderer content={contents[0]} {...item} storeConfig={storeConfig} />}
            <MagezonElement {...item} storeConfig={storeConfig} />
            {contents[2] !== '' && <WidgetRenderer content={contents[2]} {...item} storeConfig={storeConfig} />}
        </>
    );
};

const MagezonRenderer = (props) => {
    const { content, storeConfig } = props;
    const { t } = useTranslation(['common']);
    const mixedContents = content.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
    const removeIdentifier = useMemo(() => {
        try {
            const parsedContent = JSON.parse(mixedContents[1]);
            return parsedContent;
        // eslint-disable-next-line no-empty
        } catch (error) {}
    }, []);

    const customCss = removeIdentifier?.custom_css || '';

    return (
        <>
            {removeIdentifier
                && removeIdentifier.elements
                && removeIdentifier.elements.length > 0
                && removeIdentifier.elements.map((item, key) => (mixedContents[0] !== '' || mixedContents[2] !== '' ? (
                    <MixedContent key={key} {...item} storeConfig={storeConfig} contents={mixedContents} />
                ) : (
                    <MagezonElement key={key} {...item} storeConfig={storeConfig} />
                )))}
            {!removeIdentifier && (
                <div className="desktop:max-w-screen-desktop tablet:max-w-screen-tablet my-0 mx-auto">
                    <Alert severity="error" className="capitalize">{t('common:cms:unableToRender')}</Alert>
                </div>
            )}
            <style jsx>
                {`${customCss}`}
            </style>
        </>
    );
};

export default MagezonRenderer;
