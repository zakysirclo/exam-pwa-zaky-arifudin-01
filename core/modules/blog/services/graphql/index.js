import { useLazyQuery } from '@apollo/client';
import * as schema from '@core_modules/blog/services/graphql/schema';

export const getBlogPostList = () => useLazyQuery(schema.getBlogPostList);
export const getBlogCategoryList = () => useLazyQuery(schema.getBlogCategoryList);
export default {};
