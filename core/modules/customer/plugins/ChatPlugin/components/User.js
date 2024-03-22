/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { initialName } from '@core_modules/customer/helpers/chatHelper';
import Badge from '@common_badge';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

const User = (props) => {
    const {
        chat, selectUserToChat, user, db,
    } = props;
    const [dataUnread, setDataUnread] = useState([]);
    const chatId = user && user.chatId;
    const activeChat = () => (chatId === chat.chatId ? 'active' : 'unactive');

    useEffect(() => {
        const refereceUserDb = db.collection('messages');
        const customerUnreadQuery = refereceUserDb.doc(chatId).collection('chat').where('is_customer_read', 'in', [0]);

        const unsub = customerUnreadQuery.onSnapshot((querySnapshot) => {
            const adminUnread = querySnapshot.docs.map((doc) => doc.data());
            setDataUnread(adminUnread);
        });

        return unsub;
    }, [chatId]);

    return (
        <div onClick={() => selectUserToChat(user)}>
            <div className={classNames(activeChat())}>
                <div>
                    <span>{initialName(user.agent_name)}</span>
                </div>
                <div>
                    <div>{user.agent_name}</div>
                    <div>{user.agent_name}</div>
                </div>
                <div>
                    <Badge
                        badgeContent={dataUnread.length}
                        invisible={dataUnread && dataUnread.length === 0}
                        color="error"
                    />
                </div>
            </div>
        </div>
    );
};

export default User;
