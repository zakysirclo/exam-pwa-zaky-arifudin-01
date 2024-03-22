import Page from '@core_modules/rma/pages/history';

import getSSRProps from '@core_modules/rma/pages/history/ssr';

export const getServerSideProps = async (ctx) => getSSRProps(ctx);

export default Page;
