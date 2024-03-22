/* eslint-disable no-nested-ternary */
import React from 'react';
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/blog/pages/landing/core';

const Page = (props) => <Core {...props} />;

export default withApollo({ ssr: true })(withTranslation()(Page));
