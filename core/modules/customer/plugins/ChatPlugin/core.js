/* eslint-disable no-shadow */
/* eslint-disable radix */
import {
    combinedMessagesData, filteredUser, generateCombinedUser, generateGroupedMessages,
} from '@core_modules/customer/helpers/chatHelper';
import {
    addMessage, createFirebaseDoc, getCustomerSettings, getMessageList, getSessionMessageList, getBlacklist,
} from '@core_modules/customer/services/graphql';
import firebaseApp from '@lib_firebase/index';
import 'firebase/firestore';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const ChatPluginCore = (props) => {
    const {
        Content,
        handleChatPdp = () => null,
        handleChatSellerPage = () => null,
        isPdp = false,
        isSellerPage = false,
        agentSellerCode = '',
        agentSellerName = '',
        sellerMessage,
    } = props;

    const db = firebaseApp.firestore();
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [searchUser, setSerchUser] = useState('');
    const [searchText, setSearchText] = useState('');
    const [firstLoad, setFirstLoad] = useState(true);

    // autoresponse
    const [isAutoResponse, setIsAutoResponse] = useState(false);
    const [autoResponseContent, setAutoResponseContent] = useState({});

    const { data: customerData, loading: customerLoading } = getCustomerSettings();

    const customerEmail = customerData && customerData.customer && customerData.customer.email;
    const customerName = customerData && customerData.customer && `${customerData.customer.firstname} ${customerData.customer.lastname}`;
    const customerWhatsappNumber = customerData && customerData.customer && customerData.customer.whatsapp_number;
    const { data: blacklistStatus, loading: blacklistLoading } = getBlacklist({
        variables: {
            email: customerEmail,
        },
        skip: !customerEmail,
    });
    const { data, loading, refetch } = getSessionMessageList({
        variables: {
            customer_email: customerEmail,
        },
        skip: !customerEmail,
    });
    const [getMessage, { data: messageData, loading: loadingMessages }] = getMessageList();
    const [sendMessage] = addMessage();
    const [createFirebaseMsg] = createFirebaseDoc();

    // user data
    const sessionUserData = data && data.getSessionMessageList;
    const combinedUserData = generateCombinedUser(sessionUserData, users);
    const filteredUserResult = filteredUser(searchUser, combinedUserData);

    // message data
    const magentoMessageData = messageData && messageData.getMessageList && messageData.getMessageList;
    const combinedMessageResult = combinedMessagesData(magentoMessageData, msgs);
    const combinedMessages = generateGroupedMessages(combinedMessageResult);

    // useSearch
    const changeSerchUser = (e) => {
        if (e.target.value === '') {
            setSerchUser('');
            setSearchText('');
        } else {
            setSearchText(e.target.value);
        }
    };

    const handleSeachUser = (e) => {
        e.preventDefault();
        setSerchUser(searchText);
    };

    // change unread messages to read messages when typing in form
    const onFocusDeleteRead = async (selectedChat) => {
        const adminReadChat = db.collection('messages').doc(selectedChat.chatId).collection('chat').where('is_admin_read', 'in', [0]);

        const selectedDoc = db.collection('messages').doc(selectedChat.chatId).collection('chat');

        const docReference = db.collection('messages').doc(selectedChat.chatId);

        await docReference.update({
            is_admin_read: 1,
        });

        adminReadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.update(selectedDoc.doc(doc.id), { is_admin_read: 1 });
            });
            await batch.commit();
        });
    };

    const selectUserToChat = async (user) => {
        setChat('');
        setChat(user);

        const idChat = user.chatId;

        // reference chat collection
        const chatReferance = db.collection('messages').doc(idChat).collection('chat').orderBy('createdAt', 'asc');

        // collection messages doc id chat reference
        const docReference = db.collection('messages').doc(idChat);

        // reference admin unread chat
        const adminUnreadChat = db
            .collection('messages')
            .doc(idChat)
            .collection('chat')
            // .where('is_admin_read', 'in', [0]);
            .where('is_customer_read', 'in', [0]);

        // reference read chat
        const adminReadChat = db
            .collection('messages')
            .doc(idChat)
            .collection('chat')
            // .where('is_admin_read', 'not-in', [0]);
            .where('is_customer_read', 'not-in', [0]);

        // select chat collection
        const selectUpdatedDoc = db.collection('messages').doc(idChat).collection('chat');

        // update messages doc id chat reference
        await docReference.update({
            // is_admin_read: 1,
            is_customer_read: 1,
        });

        // delete read message to replace with graphql
        adminReadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.delete(selectUpdatedDoc.doc(doc.id));
            });
            await batch.commit();
        });

        // update unread message chat to read message chat
        adminUnreadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                // batch.update(selectUpdatedDoc.doc(doc.id), { is_admin_read: 1 });
                batch.update(selectUpdatedDoc.doc(doc.id), { is_customer_read: 1 });
            });
            await batch.commit();
        });

        // listen incoming messages from collection chat
        chatReferance.onSnapshot((querySnapshot) => {
            const messages = [];
            querySnapshot.docs.forEach((doc) => {
                messages.push(doc.data());
            });
            setMsgs(messages);
        });

        // get message from grapql based on session id
        await getMessage({
            variables: {
                chat_session_id: user.chat_session_id,
            },
        });

        refetch();
    };

    const clearChat = () => {
        setChat('');
    };

    // submit chat
    const submitChat = async (data, chatPar = chat, response_question_id = null, isRobot = 0) => {
        const idChat = chatPar.chatId;
        // const chatReferance = db.collection('messages').doc(idChat).collection('chat');
        const docReference = db.collection('messages').doc(idChat);

        // customer has read and admin has not read
        await docReference.update({
            is_admin_read: 0,
            is_customer_read: 1,
        });

        // send into firebase
        // await chatReferance.add({
        //     createdAt: new Date().toISOString(),
        //     customer_email: chat.customer_email,
        //     customer_id: chat.customer_id,
        //     customer_name: chat.customer_name,
        //     displayName: `${chat.customer_name}-${chat.agent_name}`,
        //     is_customer_message: 'True',
        //     agent_code: chat.agent_code,
        //     agent_name: chat.agent_name,
        //     text: data,
        //     is_admin_read: 0,
        //     is_customer_read: 1,
        //     uid: '',
        // });

        // send into magento
        sendMessage({
            variables: {
                body_message: data,
                chat_session_id: chatPar.chat_session_id,
                customer_email: chatPar.customer_email,
                // customer_id: parseInt(chat.customer_id),
                customer_name: chatPar.customer_name,
                is_robot: isRobot,
                agent_code: chatPar.agent_code,
                sender: 1,
                file: '',
                response_question_id,
            },
        }).then((response) => {
            if (
                response
                && response.data
                && response.data.addMessage
                && response.data.addMessage.auto_response
                && response.data.addMessage.auto_response.message
            ) {
                setIsAutoResponse(true);
                setAutoResponseContent(response.data.addMessage.auto_response);
            }
        });

        // refetch();
    };

    const handleAutoTextSubmit = (ans) => {
        const messageText = ans.message;
        const responseQuestionId = ans.response_question_id && ans.response_question_id;

        const isRobot = 1;

        submitChat(messageText, chat, responseQuestionId, isRobot);
        setIsAutoResponse(false);
    };

    const handleDropFile = async (files) => {
        // const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const idChat = chat.chatId;
        const docReference = db.collection('messages').doc(idChat);

        // send into magento
        if (baseCode) {
            await docReference.update({
                is_admin_read: 0,
                is_customer_read: 1,
            });

            await sendMessage({
                variables: {
                    body_message: '',
                    chat_session_id: chat.chat_session_id,
                    customer_email: chat.customer_email,
                    // customer_id: parseInt(chat.customer_id),
                    customer_name: chat.customer_name,
                    is_robot: 0,
                    agent_code: chat.agent_code,
                    sender: 1,
                    file: baseCode,
                },
            });

            // await getMessage({
            //     variables: {
            //         chat_session_id: chat.chat_session_id,
            //     },
            // });

            // refetch();
        }
    };

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        validationSchema: Yup.object().shape({
            message: Yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            submitChat(values.message);
            resetForm();
        },
    });

    // get all list messeges
    useEffect(() => {
        let unsub = () => null;
        if (customerEmail) {
            const refereceUserDb = db.collection('messages').where('customer_email', 'in', [customerEmail]);
            unsub = refereceUserDb.onSnapshot((querySnapshot) => {
                const users = querySnapshot.docs.map((doc) => ({
                    chatId: doc.id,
                    ...doc.data(),
                }));
                setUsers(users);
            });
        }

        return unsub;
    }, [customerEmail]);

    useEffect(() => {
        if (customerEmail && customerName) {
            createFirebaseMsg({
                variables: {
                    agent_code: agentSellerCode.toString() || 'admin',
                    agent_name: agentSellerName || 'Admin',
                    customer_email: customerEmail,
                    customer_name: customerName,
                    phone_number: customerWhatsappNumber,
                },
            }).then(async () => {
                refetch();
            });
        }
    }, [customerEmail, customerName, agentSellerCode, agentSellerName]);

    useEffect(() => {
        if ((isSellerPage || isPdp) && sellerMessage && firstLoad && filteredUserResult.length > 0 && customerEmail && agentSellerCode) {
            const selectedChatSellerPage = filteredUserResult.filter((user) => user.chatId === `${customerEmail}-${agentSellerCode}`);

            if (selectedChatSellerPage.length > 0) {
                selectUserToChat(selectedChatSellerPage[0]);
                if (sellerMessage) {
                    const chatPar = {
                        ...selectedChatSellerPage[0],
                    };
                    submitChat(sellerMessage, chatPar);
                }
            }
            setFirstLoad(false);
        }
    }, [sellerMessage, firstLoad, customerEmail, agentSellerCode, filteredUserResult, isSellerPage, isPdp]);

    if (loading || blacklistLoading || customerLoading) {
        return null;
    }

    return (
        <Content
            loading={loading || blacklistLoading || customerLoading}
            loadingMessages={loadingMessages}
            chat={chat}
            isBlacklisted={blacklistStatus.getBlacklist.status}
            selectUserToChat={selectUserToChat}
            clearChat={clearChat}
            listUsers={filteredUserResult}
            onFocusDeleteRead={onFocusDeleteRead}
            db={db}
            messages={combinedMessages}
            formik={formik}
            changeSerchUser={changeSerchUser}
            searchText={searchText}
            handleSeachUser={handleSeachUser}
            handleDropFile={handleDropFile}
            customerEmail={customerEmail}
            isAutoResponse={isAutoResponse}
            handleAutoTextSubmit={handleAutoTextSubmit}
            autoResponseContent={autoResponseContent}
            isPdp={isPdp}
            handleChatPdp={handleChatPdp}
            isSellerPage={isSellerPage}
            handleChatSellerPage={handleChatSellerPage}
        />
    );
};

export default ChatPluginCore;
