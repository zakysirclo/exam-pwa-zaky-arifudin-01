/* eslint-disable no-plusplus */
import Button from '@common_button';
import Typography from '@common/Typography';
import Skeleton from '@common/Skeleton';
import Show from '@common/Show';
import Link from 'next/link';

const CategoryItem = (props) => {
    const { name, breadcrumbs, url_key } = props;
    let breadcrumbsText = '';
    if (breadcrumbs) {
        for (let i = 0; i < breadcrumbs.length; i++) {
            const element = breadcrumbs[i];
            breadcrumbsText += `${element.category_name} > `;
        }
    }
    return (
        <Link href={`/${url_key}`}>
            <div className="hidden tablet:flex flex-row gap-1">
                {breadcrumbsText === '' ? (
                    <Typography color="text-neutral" className="font-normal text-sm uppercase hover:underline">
                        {name}
                    </Typography>
                ) : (
                    <>
                        <Typography color="text-neutral-400" className="italic font-normal text-sm uppercase hover:underline">
                            {breadcrumbsText}
                        </Typography>
                        <Typography color="text-neutral" className="font-normal text-sm uppercase hover:underline">
                            {name}
                        </Typography>
                    </>
                )}
            </div>
            <div className="flex tablet:hidden flex-row gap-1">
                <Typography color="text-neutral-400" className="italic font-normal text-sm uppercase">
                    {breadcrumbsText}
                </Typography>
                <Typography color="text-neutral" className="font-normal text-sm uppercase">
                    {name}
                </Typography>
            </div>
        </Link>
    );
};

const CategoryView = (props) => {
    const {
        slice, data, loadMore, loading, t,
    } = props;

    return (
        <div className="pt-4">
            <div className="flex flex-col">
                <Typography variant="h2" className="uppercase text-lg">
                    {t('common:title:category')}
                </Typography>
                {loading && (
                    <>
                        <div className="flex flex-col gap-2 tablet:hidden">
                            {[1, 2, 3, 4].map((idx) => (
                                <div className="flex flex-col gap-1" key={idx}>
                                    <Skeleton width="20%" />
                                    <Skeleton width="40%" />
                                </div>
                            ))}
                        </div>
                        <div className="hidden tablet:flex flex-col gap-3 my-2">
                            {[1, 2, 3, 4].map((idx) => (
                                <Skeleton width="20%" key={idx} />
                            ))}
                        </div>
                    </>
                )}
                <Show when={slice && slice.length > 0}>
                    <div className="flex flex-col gap-2 my-2">
                        {slice.map((item) => (
                            <CategoryItem {...item} />
                        ))}
                    </div>
                </Show>
            </div>
            <div>
                {data.length > slice.length ? (
                    <Button align="left" color="primary" onClick={() => loadMore()} style={{ margin: 10, fontSize: 8 }}>
                        {t('common:button:loadMore')}
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default CategoryView;
