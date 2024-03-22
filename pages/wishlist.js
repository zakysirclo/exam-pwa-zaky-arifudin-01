import Page from '@core_modules/customer/pages/wishlist';
import getSSRProps from '@core_modules/customer/pages/wishlist/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
