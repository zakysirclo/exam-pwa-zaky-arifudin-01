import Page from '@core_modules/customer/pages/newsletter';
import getSSRProps from '@core_modules/customer/pages/newsletter/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
