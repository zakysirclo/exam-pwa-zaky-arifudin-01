/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/*
  NOTE: This modifies next.js internal api behavior and may break your application.
  Tested on next.js version: 9.2.1
*/

import React from 'react';

// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head } from 'next/document';
import { readFileSync } from 'fs';
import { join } from 'path';

class HeadCustom extends Head {
    getCssLinks({ allFiles }) {
        const { assetPrefix } = this.context;
        if (!allFiles || allFiles.length === 0) return null;
        return allFiles
            .filter((file) => /\.css$/.test(file))
            .map((file) => (
                <style
                    key={file}
                    nonce={this.props.nonce}
                    data-href={`${assetPrefix}/_next/${file}`}
                    dangerouslySetInnerHTML={{
                        __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'),
                    }}
                />
            ));
    }
}

export default HeadCustom;
