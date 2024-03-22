import Page from '@core_modules/productcompare/pages/default';

import getSSRProps from '@core_modules/productcompare/pages/default/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
