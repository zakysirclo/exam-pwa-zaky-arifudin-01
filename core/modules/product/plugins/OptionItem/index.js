import dynamic from 'next/dynamic';
import { modules } from '@config';

const ConfigurableOption = dynamic(() => import('@plugin_optionitem/ConfigurableOption'), { ssr: false });
const SimpleOption = dynamic(() => import('@plugin_optionitem/SimpleOption'), { ssr: false });
const VirtualOption = dynamic(() => import('@plugin_optionitem/VirtualOption'), { ssr: false });
const DownloadOption = dynamic(() => import('@plugin_optionitem/DownloadableOption'), { ssr: false });
const BundleOption = dynamic(() => import('@plugin_optionitem/BundleOption'), { ssr: false });
const GroupedOption = dynamic(() => import('@plugin_optionitem/GroupedOption'), { ssr: false });
const CustomizableOption = dynamic(() => import('@plugin_customizableitem'), { ssr: false });
const AwGiftCardProduct = dynamic(() => import('@plugin_optionitem/AwGiftCardOption'), { ssr: false });

const OptionItem = (props) => {
    const {
        data,
        enableConfigurable = true,
        enableSimple = true,
        enableVirtual = true,
        enableDownload = true,
        enableBundle = true,
        eanbleGrouped = true,
        enableAwGiftCard = true,
    } = props;
    const { __typename } = data;
    return (
        <>
            { modules.product.customizableOptions.enabled && (
                <CustomizableOption
                    showCustomizableOption
                    {...props}
                />
            ) }
            {enableConfigurable && __typename === 'ConfigurableProduct' && (
                <ConfigurableOption
                    {...props}
                />
            )}

            {enableSimple && __typename === 'SimpleProduct' && (
                <SimpleOption
                    {...props}
                />
            )}

            {enableVirtual && __typename === 'VirtualProduct' && (
                <VirtualOption
                    {...props}
                />
            )}

            {enableBundle && __typename === 'BundleProduct' && (
                <BundleOption
                    {...props}
                />
            )}
            {enableDownload && __typename === 'DownloadableProduct' && (
                <DownloadOption
                    {...props}
                />
            )}
            {eanbleGrouped && __typename === 'GroupedProduct' && (
                <GroupedOption
                    {...props}
                />
            )}
            {enableAwGiftCard && __typename === 'AwGiftCardProduct' && (
                <AwGiftCardProduct {...props} />
            )}
        </>
    );
};

export default OptionItem;
