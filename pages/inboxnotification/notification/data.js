import Page from '@core_modules/notification/pages/detail';
import getSSRProps from '@core_modules/notification/pages/detail/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
