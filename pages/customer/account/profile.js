import Page from '@core_modules/customer/pages/profile';
import getSSRProps from '@core_modules/customer/pages/profile/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
