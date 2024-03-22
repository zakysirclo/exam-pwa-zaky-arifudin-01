import Link from 'next/link';
import cx from 'classnames';
import Thumbor from '@common_image';
import Show from '@common/Show';

const ItemFeatured = (props) => {
    const {
        logo, name, category_url, is_active, storeConfig,
    } = props;

    if (is_active !== 1) return null;

    const width = 180;
    const height = 180;

    return (
        <>
            <Show when={category_url}>
                <Link
                    href="/[...slug]"
                    as={category_url}
                    className={cx(
                        'block',
                    )}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        minWidth: `${width}px`,
                        minHeight: `${height}px`,
                    }}
                >
                    <Thumbor
                        src={logo}
                        width={width}
                        height={height}
                        quality={80}
                        alt={name}
                        storeConfig={storeConfig}
                    />
                </Link>
            </Show>
            <Show when={!category_url}>
                <div
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        minWidth: `${width}px`,
                        minHeight: `${height}px`,
                    }}
                >
                    <Thumbor
                        src={logo}
                        width={width}
                        height={height}
                        quality={80}
                        alt={name}
                        storeConfig={storeConfig}
                    />
                </div>
            </Show>
        </>
    );
};

export default ItemFeatured;
