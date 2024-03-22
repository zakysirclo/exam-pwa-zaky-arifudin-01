import Page from '@core_modules/customer/pages/newpassword';
import getSSRProps from '@core_modules/customer/pages/newpassword/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
