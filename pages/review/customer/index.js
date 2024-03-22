import Page from '@core_modules/productreview/pages/default';
import getSSRProps from '@core_modules/productreview/pages/default/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
