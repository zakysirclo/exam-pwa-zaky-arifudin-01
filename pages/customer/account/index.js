import Page from '@core_modules/customer/pages/account';
import getSSRProps from '@core_modules/customer/pages/account/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
