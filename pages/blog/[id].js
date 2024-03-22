import Page from '@core_modules/blog/pages/detail';
import getSSRProps from '@core_modules/blog/pages/detail/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
