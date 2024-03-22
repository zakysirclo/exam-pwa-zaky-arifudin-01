/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import MessageContainer from '@core_modules/customer/plugins/ChatPlugin/components/MessageContainer';
import UserContainer from '@core_modules/customer/plugins/ChatPlugin/components/UserContainer';
import classNames from 'classnames';

const ChatWrapper = (props) => {
    const {
        chat,
        isBlacklisted,
        // loading,
        loadingMessages,
        selectUserToChat,
        clearChat,
        listUsers,
        db,
        messages,
        formik,
        changeSerchUser,
        searchText,
        handleSeachUser,
        onFocusDeleteRead,
        toggleChat,
        handleDropFile,
        isAutoResponse,
        handleAutoTextSubmit,
        autoResponseContent,
    } = props;

    return null;
    // const desktopView = (
    //     <>
    //         {isBlacklisted === 0 ? (
    //             <>
    //                 <div className={classNames(styles.userContainer, 'hidden-mobile')}>
    //                     <UserContainer
    //                         chat={chat}
    //                         selectUserToChat={selectUserToChat}
    //                         listUsers={listUsers}
    //                         db={db}
    //                         changeSerchUser={changeSerchUser}
    //                         searchText={searchText}
    //                         handleSeachUser={handleSeachUser}
    //                     />
    //                 </div>
    //                 <div className={classNames(styles.messageContainer, 'hidden-mobile')}>
    //                     {chat ? (
    //                         <MessageContainer
    //                             chat={chat}
    //                             clearChat={clearChat}
    //                             messages={messages}
    //                             formik={formik}
    //                             onFocusDeleteRead={onFocusDeleteRead}
    //                             toggleChat={toggleChat}
    //                             handleDropFile={handleDropFile}
    //                             isAutoResponse={isAutoResponse}
    //                             handleAutoTextSubmit={handleAutoTextSubmit}
    //                             autoResponseContent={autoResponseContent}
    //                             loadingMessages={loadingMessages}
    //                         />
    //                     ) : (
    //                         <>
    //                             <div className={styles.selectedUser}>
    //                                 <div className={styles.userText} />
    //                                 <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
    //                                     <CloseIcon />
    //                                 </div>
    //                             </div>
    //                             <div className={styles.messageContent}>
    //                                 <div style={{ textAlign: 'center' }}>
    //                                     <img style={{ width: '125px' }} src="/assets/img/ghosts.png" alt="empty" />
    //                                     <p className={styles.emptyText}>Select User to Chat</p>
    //                                 </div>
    //                             </div>
    //                         </>
    //                     )}
    //                 </div>
    //             </>
    //         ) : (
    //             <>
    //                 <div className={classNames(styles.messageContent, 'hidden-mobile')}>
    //                     <div className={styles.closeBlockedUser}>
    //                         <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
    //                             <CloseIcon />
    //                         </div>
    //                     </div>
    //                     <div className={styles.blockedUserContent}>
    //                         <img style={{ width: '125px' }} src="/assets/img/ghosts.png" alt="empty" />
    //                         <p className={styles.emptyText}>Your Account was blocked in our blacklist. So, you will not get any messages.</p>
    //                     </div>
    //                 </div>
    //             </>
    //         )}
    //     </>
    // );

    // const mobileView = (
    //     <>
    //         {isBlacklisted === 0 ? (
    //             <>
    //                 {!chat ? (
    //                     <div className={classNames(styles.userContainer, 'hidden-desktop')}>
    //                         <UserContainer
    //                             chat={chat}
    //                             toggleChat={toggleChat}
    //                             selectUserToChat={selectUserToChat}
    //                             listUsers={listUsers}
    //                             db={db}
    //                             changeSerchUser={changeSerchUser}
    //                             searchText={searchText}
    //                             handleSeachUser={handleSeachUser}
    //                         />
    //                     </div>
    //                 ) : (
    //                     <div className={classNames(styles.messageContainer, 'hidden-desktop')}>
    //                         <MessageContainer
    //                             chat={chat}
    //                             clearChat={clearChat}
    //                             messages={messages}
    //                             formik={formik}
    //                             onFocusDeleteRead={onFocusDeleteRead}
    //                             toggleChat={toggleChat}
    //                             handleDropFile={handleDropFile}
    //                             isAutoResponse={isAutoResponse}
    //                             handleAutoTextSubmit={handleAutoTextSubmit}
    //                             autoResponseContent={autoResponseContent}
    //                             loadingMessages={loadingMessages}
    //                         />
    //                     </div>
    //                 )}
    //             </>
    //         ) : (
    //             <>
    //                 <div className={classNames(styles.messageContent, 'hidden-desktop')}>
    //                     <div className={styles.closeBlockedUser}>
    //                         <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
    //                             <CloseIcon />
    //                         </div>
    //                     </div>
    //                     <div style={{ height: '70%' }} className={styles.blockedUserContent}>
    //                         <img style={{ width: '125px' }} src="/assets/img/ghosts.png" alt="empty" />
    //                         <p className={styles.emptyText}>Your Account was blocked in our blacklist. So, you will not get any messages.</p>
    //                     </div>
    //                 </div>
    //             </>
    //         )}
    //     </>
    // );

    // return (
    //     <div className={styles.container}>
    //         {desktopView}
    //         {mobileView}
    //     </div>
    // );
};

export default ChatWrapper;
