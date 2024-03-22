import Page from '@core_modules/notification/pages/list';
import getSSRProps from '@core_modules/notification/pages/list/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
