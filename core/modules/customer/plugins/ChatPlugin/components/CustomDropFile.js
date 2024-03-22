/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Button from '@common_button';
import { useTranslation } from 'next-i18next';
import { useDropzone } from 'react-dropzone';

const DropFile = (props) => {
    const { t } = useTranslation(['common']);
    const {
        title = '', textButton = t('common:Choose_File'), formatFile = '.csv', getBase64, showFiles = true, singleFile = false,
    } = props;
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    const onDropAccepted = async (files) => {
        let filebase64 = [];
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [
                    ...filebase64,
                    {
                        baseCode,
                        file: files[ind],
                    },
                ];
            }
        }
        getBase64(filebase64);
    };
    const messageError = `${`common:fileUpload:reject${formatFile}`}`;
    const {
        getRootProps, getInputProps, acceptedFiles, open,
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDropAccepted,
        accept: formatFile,
        onDropRejected: () => window.toastMessage({
            open: true,
            text: messageError,
            variant: 'error',
        }),
    });
    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path}
            {' '}
            -
            {file.size}
            {' '}
            bytes
        </li>
    ));

    return null;
    // return (
    //     <div className={classes.contentDropFile}>
    //         {title}
    //         <div {...getRootProps({ className: 'dropzone' })}>
    //             <input {...getInputProps()} />
    //             <Button className={classes.btn} type="button" onClick={open}>
    //                 {textButton}
    //             </Button>
    //             {files.length === 0 && showFiles && <span className={classes.textNoFile}>{t('common:No_file_chosen')}</span>}
    //         </div>
    //         {showFiles && (
    //             <aside>
    //                 <ul>{singleFile ? files[0] : files}</ul>
    //             </aside>
    //         )}
    //     </div>
    // );
};

export default DropFile;
