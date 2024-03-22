import Page from '@core_modules/scv2/pages/error';

import getSSRProps from '@core_modules/scv2/pages/error/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
