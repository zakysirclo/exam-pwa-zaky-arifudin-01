import Page from '@core_modules/blog/pages/landing';
import getSSRProps from '@core_modules/blog/pages/landing/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
