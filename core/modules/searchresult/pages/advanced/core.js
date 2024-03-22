import Layout from '@layout';
import { useRouter } from 'next/router';
import getQueryFromPath from '@helper_generatequery';
import { getHost } from '@helper_config';
import PropTypes from 'prop-types';

const SearchResult = (props) => {
    const router = useRouter();
    const { storeConfig, Content } = props;
    const { query } = getQueryFromPath(router);
    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [{
                '@type': 'SearchAction',
                target: `${getHost()}/catalogsearch/advanced/result?brand[]={search_term_string}`,
                'query-input': 'required name=search_term_string',
            }],
        },
    ];
    const pageConfig = {
        title: 'Advanced Search Results',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Advanced Search Results',
        bottomNav: 'browse',
        schemaOrg,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} q={query.q} />
        </Layout>
    );
};

SearchResult.propTypes = {
    Content: PropTypes.func.isRequired,
};

export default SearchResult;
