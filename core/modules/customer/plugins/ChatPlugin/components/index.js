/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable no-new */
import React, { useEffect, useState } from 'react';
import ChatWrapper from '@core_modules/customer/plugins/ChatPlugin/components/ChatWrapper';

const Content = (props) => {
    const {
        chat,
        isBlacklisted,
        loading,
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
        handleDropFile,
        customerEmail,
        isAutoResponse,
        handleAutoTextSubmit,
        autoResponseContent,
        isPdp,
        handleChatPdp,
        isSellerPage,
        handleChatSellerPage,
    } = props;

    const [showChat, setShowChat] = useState(false);
    const [msgs, setMsgs] = useState([]);
    const toggleChat = () => {
        if (isPdp) {
            handleChatPdp();
        } else if (isSellerPage) {
            handleChatSellerPage();
        } else {
            setShowChat(!showChat);
            clearChat();
        }
    };

    useEffect(() => {
        let unsub = () => null;

        if (customerEmail && !isPdp && !isSellerPage) {
            const refereceUserDb = db.collection('messages');
            const customerQuery = refereceUserDb.where('is_customer_read', 'in', [0]).where('customer_email', '==', customerEmail);
            const q = customerQuery;

            unsub = q.onSnapshot((querySnapshot) => {
                const unread = [];
                querySnapshot.docs.forEach((doc) => {
                    unread.push({
                        chatId: doc.id,
                        ...doc.data(),
                    });
                });
                setMsgs(unread);
            });
        }

        return unsub;
    }, [customerEmail, isPdp, isSellerPage]);

    useEffect(() => {
        if (msgs && msgs.length > 0 && typeof window !== 'undefined') {
            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            } else {
                new Notification('New Messages', {
                    icon: '/assets/img/pwa.png',
                    body: `you have ${msgs.length} messages`,
                });
            }
        }
    }, [msgs]);

    return null;
    // if (loading) {
    //     return null;
    // }

    // return (
    //     <div>
    //         {isPdp || isSellerPage ? (
    //             <ChatWrapper
    //                 loading={loading}
    //                 loadingMessages={loadingMessages}
    //                 chat={chat}
    //                 isBlacklisted={isBlacklisted}
    //                 selectUserToChat={selectUserToChat}
    //                 clearChat={clearChat}
    //                 listUsers={listUsers}
    //                 onFocusDeleteRead={onFocusDeleteRead}
    //                 db={db}
    //                 messages={messages}
    //                 formik={formik}
    //                 changeSerchUser={changeSerchUser}
    //                 searchText={searchText}
    //                 handleSeachUser={handleSeachUser}
    //                 toggleChat={toggleChat}
    //                 handleDropFile={handleDropFile}
    //                 isAutoResponse={isAutoResponse}
    //                 handleAutoTextSubmit={handleAutoTextSubmit}
    //                 autoResponseContent={autoResponseContent}
    //             />
    //         ) : (
    //             <>
    //                 {showChat ? (
    //                     <>
    //                         <ChatWrapper
    //                             loading={loading}
    //                             loadingMessages={loadingMessages}
    //                             chat={chat}
    //                             isBlacklisted={isBlacklisted}
    //                             selectUserToChat={selectUserToChat}
    //                             clearChat={clearChat}
    //                             listUsers={listUsers}
    //                             onFocusDeleteRead={onFocusDeleteRead}
    //                             db={db}
    //                             messages={messages}
    //                             formik={formik}
    //                             changeSerchUser={changeSerchUser}
    //                             searchText={searchText}
    //                             handleSeachUser={handleSeachUser}
    //                             toggleChat={toggleChat}
    //                             handleDropFile={handleDropFile}
    //                             isAutoResponse={isAutoResponse}
    //                             handleAutoTextSubmit={handleAutoTextSubmit}
    //                             autoResponseContent={autoResponseContent}
    //                         />
    //                     </>
    //                 ) : (
    //                     <div className={styles.chatPlugin}>
    //                         <Fab color="primary" size="medium" onClick={toggleChat} className={styles.buttonChat}>
    //                             { msgs && msgs.length > 0 ? (
    //                                 <Badge badgeContent={msgs.length} color="error" className={styles.indexBadge} max={99}>
    //                                     <ChatIcon className={styles.chatIcon} />
    //                                 </Badge>
    //                             ) : (
    //                                 <ChatIcon className={styles.chatIcon} />
    //                             )}
    //                         </Fab>
    //                     </div>
    //                 )}
    //             </>
    //         )}
    //     </div>
    // );
};

export default Content;
