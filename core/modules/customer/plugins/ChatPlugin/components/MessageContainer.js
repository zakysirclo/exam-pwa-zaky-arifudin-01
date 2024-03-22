/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-expressions */
import { initialName, relativeTimeFrom } from '@core_modules/customer/helpers/chatHelper';
import CustomDropFile from '@core_modules/customer/plugins/ChatPlugin/components/CustomDropFile';
import formatDate from '@core/helpers/date';
import React, { useEffect, useRef } from 'react';

import classNames from 'classnames';

const MessageContainer = (props) => {
    const {
        chat,
        clearChat,
        loadingMessages,
        messages,
        formik,
        onFocusDeleteRead,
        toggleChat,
        handleDropFile,
        isAutoResponse,
        handleAutoTextSubmit,
        autoResponseContent,
    } = props;
    const scrollRef = useRef();

    // eslint-disable-next-line max-len
    // const containerMessageStyle = (msgObject1) => (msgObject1.is_customer_message !== 'True' || msgObject1.is_robot
    //     ? styles.messageLeftWrapper
    //     : styles.messageRightWrapper);

    // // eslint-disable-next-line max-len
    // const contentMessageText = (msgObject3) => (msgObject3.is_customer_message !== 'True' || msgObject3.is_robot
    //     ? styles.messageLeftText
    //     : styles.messageRightText);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    return null;
    // if (loadingMessages) {
    //     return (
    //         <div>
    //             <div className={styles.selectedUser}>
    //                 <div className={styles.selectedUserImage}>
    //                     <Skeleton animation="wave" variant="circle" height={25} width={25} />
    //                 </div>
    //                 <div className={styles.userText}>
    //                     <Skeleton animation="wave" variant="rect" height={25} width="100%" />
    //                 </div>
    //             </div>
    //             <div className={styles.messageContent}>
    //                 <Skeleton animation="wave" variant="text" height={80} width="100%" />
    //                 <Skeleton animation="wave" variant="text" height={80} width="100%" />
    //                 <Skeleton animation="wave" variant="text" height={80} width="100%" />
    //             </div>
    //             <div className={styles.formContent}>
    //                 <Skeleton animation="wave" variant="rect" height={35} width="100%" />
    //             </div>
    //         </div>
    //     );
    // }

    // return (
    //     <>
    //         <div className={styles.selectedUser}>
    //             <div className={styles.userImageWrapper}>
    //                 <div className={classNames(styles.userBackIcon, 'hidden-desktop')} onClick={clearChat}>
    //                     <ArrowBackIosIcon />
    //                 </div>

    //                 <div onClick={clearChat} className={styles.selectedUserImage}>
    //                     <span>{initialName(chat.agent_name)}</span>
    //                 </div>
    //             </div>
    //             <div className={styles.userText}>
    //                 <div className={styles.userName}>{chat.agent_name}</div>
    //                 <div className={styles.userLastMessage}>
    //                     last online
    //                     {' '}
    //                     {relativeTimeFrom(chat.lastMessage.time)}
    //                     {' '}
    //                     ago
    //                 </div>
    //             </div>
    //             <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
    //                 <CloseIcon />
    //             </div>
    //         </div>
    //         <div className={styles.messageContent}>
    //             {messages
    //                 && messages.length > 0
    //                 && messages.map((message, i) => {
    //                     if (message.type && message.type === 'day') {
    //                         return (
    //                             <p key={i} className={styles.messageCenterDate}>
    //                                 {formatDate(message.date, 'D MMM YYYY')}
    //                             </p>
    //                         );
    //                     }
    //                     // if (chat.chatId === `${message.customer_id}-${message.agent_code}`) {
    //                     if (chat.chatId === `${message.customer_email}-${message.agent_code}`) {
    //                         return (
    //                             <div key={i} className={containerMessageStyle(message)}>
    //                                 <div className={styles.messageLeftContent}>
    //                                     {message.filename ? (
    //                                         <span className={contentMessageText(message)}>
    //                                             {message.filetype === 'image' ? (
    //                                                 <>
    //                                                     <img className={styles.messageImage} src={message.filename} alt="messageImage" />
    //                                                     <span>{formatDate(message.createdAt, 'HH:mm')}</span>
    //                                                 </>
    //                                             ) : (
    //                                                 <>
    //                                                     <a href={message.filename} target="_blank" rel="noopener noreferrer">
    //                                                         <DescriptionOutlinedIcon fontSize="large" />
    //                                                         <div>Click to Open</div>
    //                                                     </a>
    //                                                     <span>{formatDate(message.createdAt, 'HH:mm')}</span>
    //                                                 </>
    //                                             )}
    //                                         </span>
    //                                     ) : (
    //                                         <span className={contentMessageText(message)}>
    //                                             {message.text}
    //                                             <span>{formatDate(message.createdAt, 'HH:mm')}</span>
    //                                         </span>
    //                                     )}
    //                                     {message.is_robot ? (
    //                                         <span className={styles.botName}>bot</span>
    //                                     ) : (
    //                                         <>
    //                                             {message.is_customer_message === 'True' ? (
    //                                                 <span className={styles.customerName}>you</span>
    //                                             ) : (
    //                                                 <span className={styles.botName}>{message.agent_code}</span>
    //                                             )}
    //                                         </>
    //                                     )}
    //                                 </div>
    //                             </div>
    //                         );
    //                     }
    //                     return null;
    //                 })}
    //             {isAutoResponse && (
    //                 <div className={styles.autoResponseWrapper}>
    //                     <div className={styles.autoResponseTitle}>
    //                         <span>{autoResponseContent && autoResponseContent.message}</span>
    //                     </div>
    //                     <div className={styles.autoResponseBody}>
    //                         {autoResponseContent
    //                             && autoResponseContent.answer
    //                             && autoResponseContent.answer.length > 0
    //                             && autoResponseContent.answer.map((ans) => (
    //                                 <p
    //                                     key={ans.id}
    //                                     // onClick={() => handleAutoTextSubmit(ans.message)}
    //                                     onClick={() => handleAutoTextSubmit(ans)}
    //                                 >
    //                                     {ans.message}
    //                                 </p>
    //                             ))}
    //                     </div>
    //                 </div>
    //             )}
    //             <div ref={scrollRef} />
    //         </div>
    //         <div className={styles.formContent}>
    //             <div className={styles.uploadContainer}>
    //                 <CustomDropFile
    //                     showFiles={false}
    //                     textButton={<AttachFileSharpIcon />}
    //                     formatFile=".jpg, .jpeg, .png, .gif, .pdf, .doc"
    //                     getBase64={handleDropFile}
    //                 />
    //             </div>
    //             <form noValidate autoComplete="off" className={styles.messageForm} onSubmit={formik.handleSubmit}>
    //                 <TextField
    //                     name="message"
    //                     placeholder="Tulis Pesan..."
    //                     className={styles.messageInput}
    //                     value={formik.values.message}
    //                     onChange={formik.handleChange}
    //                     error={!!formik.errors.message}
    //                     errorMessage={formik.errors.message || null}
    //                     onFocus={() => onFocusDeleteRead(chat)}
    //                 />
    //                 <Button type="submit" className={styles.messageButton}>
    //                     <SendIcon
    //                         style={{
    //                             color: 'white',
    //                         }}
    //                     />
    //                 </Button>
    //             </form>
    //         </div>
    //     </>
    // );
};

export default MessageContainer;
