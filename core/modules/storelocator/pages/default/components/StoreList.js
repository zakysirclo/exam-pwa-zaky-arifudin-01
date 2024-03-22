/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Thumbor from '@common_image';
import Typography from '@common/Typography';
import cx from 'classnames';

const StoreList = ({
    //
    storeList,
    totalAllStore,
    onClickListItem,
    t,
}) => {
    return (
        <>
            <div className="store-list">
                <h3>
                    {t('storelocator:storeList')}
                    <span>{`( ${storeList.length} of ${totalAllStore})`}</span>
                </h3>
                <div className="py-2">
                    {storeList.map((store, i) => (
                        <div key={i}>
                            <hr style={{ display: i ? 'block' : 'none' }} />
                            <div
                                className={cx(
                                    'flex',
                                    'py-2',
                                    'px-4',
                                    'hover:bg-neutral-100',
                                    'cursor-pointer',
                                    'transition-[background-color_150ms_cubic-bezier(0.4,0,0.2,1)_0ms]',
                                )}
                                onClick={() => onClickListItem(store)}
                            >
                                <div className="min-w-[56px] h-10 mt-2">
                                    <div className="rounded-[50%] w-10 h-10 overflow-hidden">
                                        <Thumbor src={store.baseimage} width={40} height={40} />
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div>
                                        <Typography>{store.store_name}</Typography>
                                    </div>
                                    <div>
                                        <Typography>
                                            <small>
                                                {store.state}
                                                {', '}
                                                {store.city}
                                                {', '}
                                                {store.address}
                                                <br />
                                                {store.phone}
                                            </small>
                                        </Typography>
                                        <div>
                                            <a
                                                className="direction-button"
                                                href={`https://www.google.com/maps/dir/Current+Location/${store.lat},${store.lng}`}
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                {t('storelocator:direction')}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!storeList.length && <div>No Results.</div>}
            </div>
            <style jsx>
                {`
                    .store-list {
                        border: 2px solid #ddd;
                        padding: 12px;
                        height: calc(50vh + 72px);
                        max-height: calc(50vh + 72px);
                        margin-bottom: 16px;
                        overflow: auto;
                    }
                    @media screen and (max-width: 767px) {
                        .store-list {
                            height: unset;
                        }
                    }
                    h3 {
                        margin: 0;
                    }
                    h3 span {
                        float: right;
                    }
                    hr {
                        border: 0;
                        border-top: 2px solid #ddd;
                    }
                    .direction-button {
                        float: right;
                        font-weight: bold;
                        font-size: 12px;
                    }
                    .direction-button:hover {
                        text-decoration: underline;
                    }
                `}
            </style>
        </>
    );
};

export default StoreList;
