import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/home/service/graphql/schema';

let fetchPolicy = '';
fetchPolicy = 'cache-first';
// uncomment this line (set 'no-cache') to test loader/skeleton component
// fetchPolicy = 'no-cache';

export const getBannerSlider = () => useQuery(Schema.getBannerSlider, {
    fetchPolicy,
});

export const getSlider = (options = {}) => useQuery(Schema.getSlider, {
    fetchPolicy,
    ...options,
});

export const getFeaturedProducts = (options = {}, config = {}) => useQuery(Schema.getFeaturedProducts(config), {
    fetchPolicy,
    ...options,
});
export const getCategoryList = (options = {}) => useQuery(Schema.getCategoryList, {
    fetchPolicy,
    ...options,
});

export const getCmsPageConfig = () => useQuery(Schema.getCmsPageConfig, {
    fetchPolicy,
});

export const getHomePageConfig = () => useQuery(Schema.getHomePageConfig, {
    fetchPolicy,
});

export default {
    getCategoryList, getBannerSlider, getFeaturedProducts, getSlider, getCmsPageConfig,
};
