import { getCmsBlocks, categories } from '@core_modules/theme/services/graphql/schema';
import { getStoreName, getCurrencySchema } from '@core_modules/setting/services/graphql/schema';
import { gql } from '@apollo/client';
import graphRequestClear from '@graphql_ssr';
import { footerVersion } from '@config';

const layoutStoreConfigSchema = (storeConfigExtra) => gql`
        {
            storeConfig {
                pwa {
                    megamenu_cms_block
                    ${storeConfigExtra}
                }
            }
        }
    `;

const getSSRProps = async ({ apolloClient, storeConfigExtra = '' }) => {
    // get cms page
    let storeConfig = await graphRequestClear(layoutStoreConfigSchema(storeConfigExtra));
    storeConfig = storeConfig?.storeConfig ?? null;
    const cmsStaticMainMenuIdentifier = storeConfig?.pwa?.megamenu_cms_block;
    if (storeConfig) {
        try {
            // header
            await apolloClient.query({
                query: categories,
            });
            // header setting currency
            await apolloClient.query({
                query: getCurrencySchema,
            });
            // header setting store
            await apolloClient.query({
                query: getStoreName,
            });

            // news letter
            // await apolloClient.query({
            //     query: getCmsBlocks,
            //     variables: { identifiers: 'weltpixel_newsletter_v5' },
            // });

            // footer
            await apolloClient.query({
                query: getCmsBlocks,
                variables: { identifiers: [footerVersion] },
            });

            // cms block dynamic mega menu
            if (cmsStaticMainMenuIdentifier) {
                await apolloClient.query({
                    query: getCmsBlocks,
                    variables: { identifiers: [cmsStaticMainMenuIdentifier] },
                });
            }

            await apolloClient.query({
                query: getCmsBlocks,
                variables: {
                    identifiers: 'global_promo_message',
                },
            });
            // eslint-disable-next-line no-empty
        } catch (error) {}

        return {
            storeConfig,
        };
    }

    return {};
};

export default getSSRProps;
