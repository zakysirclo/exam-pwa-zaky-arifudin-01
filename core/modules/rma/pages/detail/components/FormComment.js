import TextField from '@common_forms/TextField';
import DropFile from '@common_dropfile';

const FormComment = ({
    commentValue, t, handleGetBase64, fileAccept,
    handleChangeComment, dropValue, handleDrop,
}) => (
    <>
        <div className="desktop:max-w-[50%]">
            <TextField
                name="message"
                onChange={handleChangeComment}
                value={commentValue}
                placeholder={t('rma:form:placeholder:message')}
                label={t('rma:form:label:message')}
                multiline
                rows={4}
                className="w-full"
                inputProps={{
                    className: 'w-full',
                }}
                propsLabelText={{ variant: 'bd-2' }}
            />
        </div>
        <div className="desktop:max-w-[50%]">
            <DropFile
                value={dropValue}
                setValue={handleDrop}
                label={t('rma:form:placeholder:uploadFile')}
                getBase64={handleGetBase64}
                acceptedFile={fileAccept}
            />
        </div>
    </>
);

export default FormComment;
