import Page from '@core_modules/customer/pages/giftcard';
import getSSRProps from '@core_modules/customer/pages/giftcard/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
