import Page from '@core_modules/rewardpoint/pages/default';
import getSSRProps from '@core_modules/rewardpoint/pages/default/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
