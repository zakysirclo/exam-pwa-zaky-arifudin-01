import Page from '@core_modules/rma/pages/detail';

import getSSRProps from '@core_modules/rma/pages/detail/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
