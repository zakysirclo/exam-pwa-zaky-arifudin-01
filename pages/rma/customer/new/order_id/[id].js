import Page from '@core_modules/rma/pages/new';

import getSSRProps from '@core_modules/rma/pages/new/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
