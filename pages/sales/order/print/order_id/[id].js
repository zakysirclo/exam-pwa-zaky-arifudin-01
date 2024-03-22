import Page from '@core_modules/order/pages/print';
import getSSRProps from '@core_modules/order/pages/print/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
