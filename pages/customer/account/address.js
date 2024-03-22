import Page from '@core_modules/customer/pages/address';
import getSSRProps from '@core_modules/customer/pages/address/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
