/* eslint-disable react/forbid-prop-types */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';
import Typography from '@common_typography';
import propTypes from 'prop-types';
import Show from '@common_show';
import CircularProgress from '@common_circularprogress';
import cx from 'classnames';
import { CloudArrowUpIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { uniq } from 'lodash';

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const DropFile = ({
    label,
    width = null,
    error = false,
    title,
    showListFile,
    acceptedFile,
    maxSize,
    multiple,
    handleDrop,
    getBase64,
    dropValue,
    value,
    setValue,
    noStyle = false,
    maxWidth,
    maxHeight,
    hintText,
    loading,
    className = '',
    labelProps = {},
}) => {
    const { t } = useTranslation(['common']);
    const [isInternalError, setIsInternalError] = React.useState(null);
    const [dropFile, setDropFile] = React.useState(dropValue);
    const isError = error || isInternalError;
    const isTempImageExists = showListFile && ((value && value?.length > 0) || (dropFile && dropFile.length > 0));

    const {
        className: classNameLabel = '',
        ...otherLabelProps
    } = labelProps;

    const checkImage = async (files) => {
        const promises = [];
        for (let index = 0; index < files.length; index += 1) {
            const file = files[index];
            const promise = new Promise((resolve) => {
                const image = new Image();
                image.onload = () => {
                    file.width = image.width;
                    file.height = image.height;
                    resolve(file);
                };
                const url = URL.createObjectURL(file);
                image.src = url;
            });
            promises.push(promise);
        }

        const dataFiles = await Promise.all(promises);
        let errorImage;
        for (let index = 0; index < dataFiles.length; index += 1) {
            const file = files[index];
            if (file.type && file.type.match(/image/) && maxWidth && maxHeight) {
                if (file.width >= maxWidth || file.height >= maxHeight) {
                    errorImage = `${t('common:fileUpload:maxSizeImage')} ${maxWidth}X${maxHeight} pixel`;
                }
            }
        }

        return errorImage;
    };
    const onDrop = useCallback(async (files) => {
        if (files && files.length > 0) {
            const errorImage = await checkImage(files);
            if (errorImage) {
                setIsInternalError(errorImage);
            } else {
                if (multiple) {
                    setDropFile(uniq([...dropFile, ...files], ''));
                    if (setValue) setValue(uniq([...dropFile, ...files]));
                } else {
                    setDropFile([files[0]]);
                    if (setValue) setValue([files[0]]);
                }
                handleDrop(files);
            }
        }
        // Do something with the files
    }, []);

    const onDropAccepted = async (files) => {
        // eslint-disable-next-line array-callback-return
        let filebase64 = [];
        setIsInternalError(null);
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [...filebase64, {
                    baseCode,
                    file: files[ind],
                }];
            }
        }

        const errorImage = await checkImage(files);
        if (!errorImage) {
            getBase64(filebase64);
        }
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        open,
    } = useDropzone({
        onDrop,
        accept: acceptedFile,
        onDropAccepted,
        onDropRejected: () => {
            const messageError = `${t('common:fileUpload:reject') + acceptedFile}& max file ${maxSize / 1000000}Mb`;
            setIsInternalError(messageError);
        },
        maxSize,
    });

    return (
        <div className="flex flex-col">
            {
                title && (
                    <Typography
                        variant="h4"
                        color={error ? 'red' : 'default'}
                        className={cx('mb-[12px]', classNameLabel)}
                        {...otherLabelProps}
                    >
                        {title}
                    </Typography>
                )
            }
            <div
                style={{
                    ...(width ? { width } : null),
                }}
                className={
                    cx(
                        'px-[20px] py-[16px] rounded-[8px] cursor-pointer flex items-center',
                        loading && 'justify-between',
                        !isTempImageExists && 'border-[1px] border-neutral-400 border-dashed justify-center text-center',
                        isError && 'border-red-600 text-red-600 text-center',
                        isTempImageExists && 'border-[1px] border-neutral-100 bg-neutral-100 text-left justify-between',
                        className,
                    )
                }
            >

                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Show when={!isTempImageExists && noStyle}>
                        <button type="button" onClick={open}>
                            <Typography
                                variant="bd-2b"
                                className={cx()}
                            >
                                {t('common:label:chooseFile')}
                            </Typography>
                        </button>
                    </Show>
                    <Show when={!isTempImageExists && !noStyle}>
                        <div className="container-dnd-active flex items-center">
                            <Typography
                                variant="bd-2b"
                                className={cx('flex items-center justify-center', isError && 'border-red-600 text-red-600')}
                            >
                                <CloudArrowUpIcon className="mr-3 w-5 h-5" />
                                {isDragActive ? t('common:fileUpload:dragActive') : t('common:fileUpload:dragNonActive')}
                            </Typography>
                        </div>
                    </Show>

                    {/* SHOW FILES NAME */}
                    <Show when={isTempImageExists}>
                        <div className="container-dnd-file flex items-center">
                            <PhotoIcon className="mr-3 text-neutral-700 w-5 h-5" />
                            <div className="flex flex-col items-center">
                                {
                                    value && value.length > 0
                                        ? value?.map((file, index) => (<Typography variant="bd-2b" key={index}>{file.name}</Typography>))
                                        : dropFile?.map((file, index) => (<Typography variant="bd-2b" key={index}>{file.name}</Typography>))
                                }
                            </div>
                        </div>
                    </Show>
                    <Show when={!isTempImageExists && isDragActive}>
                        <div className="container-dnd-file flex flex-col items-center">
                            <div className="flex flex-col items-center">
                                {
                                    showListFile && dropFile.length > 0 && dropFile.map(
                                        (file, index) => (
                                            <Typography variant="bd-2b" key={index}>{file.name}</Typography>
                                        ),
                                    )
                                }
                            </div>
                        </div>
                    </Show>
                </div>

                <Show when={isTempImageExists && loading}>
                    <CircularProgress className="flex justify-center items-center" size="small" />
                </Show>
                <Show when={isTempImageExists && !loading}>
                    <button
                        type="button"
                        className="flex items-center justify-center z-50"
                        onClick={() => {
                            setValue([]);
                            setDropFile([]);
                        }}
                    >
                        {' '}
                        <XMarkIcon className="text-neutral-600 w-5 h-5" />
                    </button>
                </Show>
            </div>

            {/* SHOW ERROR */}
            <Show when={isDragReject || isInternalError !== null || error}>
                <Typography variant="bd-2b" className="mt-[12px]" color="text-red-600">{error ? label : isInternalError}</Typography>
            </Show>
            {/* SHOW HINTS */}
            <Show when={hintText}>
                <Typography variant="bd-2b" className="mt-[12px]" color="text-neutral-600">{hintText}</Typography>
            </Show>
        </div>
    );
};

DropFile.propTypes = {
    label: propTypes.string,
    title: propTypes.string,
    showListFile: propTypes.bool,
    acceptedFile: propTypes.string,
    maxSize: propTypes.number,
    multiple: propTypes.bool,
    handleDrop: propTypes.func,
    getBase64: propTypes.func,
    error: propTypes.any,
    dropValue: propTypes.array,
    value: propTypes.array,
    setValue: propTypes.func,
};

DropFile.defaultProps = {
    label: '',
    title: '',
    showListFile: true,
    acceptedFile: 'image/*,.pdf,.doc,.docx,xls,xlsx,.zip,.rar',
    maxSize: 2000000,
    multiple: true,
    handleDrop: () => {},
    getBase64: () => {},
    error: false,
    dropValue: [],
    value: [],
    setValue: () => {},
};

export default DropFile;
