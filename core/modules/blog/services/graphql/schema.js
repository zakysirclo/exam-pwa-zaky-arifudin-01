import { gql } from '@apollo/client';

export const getBlogCategoryList = gql`
    query getBlogCategoryList {
        getBlogCategoryList {
            status
            message
            total_count
            blog_category {
                category_id
                identifier
                title
            }
        }
    }
`;

export const getBlogPostList = gql`
    query getBlogPostList($filter: BlogPostFilterInput, $pageSize: Int, $currentPage: Int, $sort: BlogPostSortInput) {
        getBlogPostList(filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
            status
            message
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
            blog_data {
                id
                author_id
                canonical_url
                creation_time
                update_time
                publish_date
                identifier
                meta_description
                meta_keywords
                meta_title
                og_description
                og_title
                og_type
                title
                total_views
                type
                image
                video_link
                categories {
                    id
                    title
                }
                tags {
                    id
                    title
                }
                comments {
                    id
                    content
                }
                content
                related_products {
                    url_key
                }
                featured
                position
            }
        }
    }
`;

export default {};
