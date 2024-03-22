import Page from '@core_modules/scv2/pages/success';

import getSSRProps from '@core_modules/scv2/pages/success/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
