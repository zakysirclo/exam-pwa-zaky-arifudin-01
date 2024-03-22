import Page from '@core_modules/order/pages/history/downloadable';
import getSSRProps from '@core_modules/order/pages/history/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
