import classNames from 'classnames';

const GridList = ({
    data = [],
    className = '',
    ItemComponent,
    itemProps = {},
    gridContainerProps = {},
    gridItemProps = {},
}) => {
    if (!ItemComponent) return null;
    return (
        <div
            className={classNames('grid grid-cols-2 grid-rows-1 gap-2', className)}
            {...gridContainerProps}
        >
            {data.map((item, index) => (
                <div key={index} {...gridItemProps}>
                    <ItemComponent {...itemProps} {...item} />
                </div>
            ))}
        </div>
    );
};

export default GridList;
