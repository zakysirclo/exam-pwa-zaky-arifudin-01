import Show from '@common/Show';
import classNames from 'classnames';
import CloseIcon from '@heroicons/react/24/outline/XCircleIcon';

const Chip = ({
    disabled = false, label = '', active = false, onDelete = () => {}, onClick = () => {}, className = '',
}) => (
    <button
        disabled={disabled}
        onClick={onClick}
        type="button"
        className={classNames(
            'py-1 px-2 rounded-full',
            'disabled:bg-neutral-200 disabled:border-neutral-150',
            'bg-neutral-white border border-neutral hover:bg-primary hover:border-primary-600',
            'hover:text-neutral-white',
            active ? 'border-primary-600 bg-primary text-neutral-white' : '',
            'flex flex-row items-center justify-between gap-2 text-center line-clamp-1 max-w-max',
            'text-base',
            className,
        )}
    >
        {label}
        <Show when={active}>
            <CloseIcon className="w-4 h-4 text-neutral-white cursor-pointer" onClick={onDelete} />
        </Show>
    </button>
);

export default Chip;
