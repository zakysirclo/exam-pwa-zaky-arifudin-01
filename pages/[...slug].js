import Page from '@core_modules/slug';
import getSSRProps from '@core_modules/slug/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
