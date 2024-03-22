/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

const UserContainer = (props) => {
    const {
        chat, toggleChat, selectUserToChat, listUsers, db, changeSerchUser, searchText, handleSeachUser,
    } = props;
    return null;
    // return (
    //     <>
    //         <div className={styles.userMainTitle}>
    //             <h3>Chat</h3>
    //             <div className="hidden-desktop" style={{ cursor: 'pointer' }} onClick={toggleChat}>
    //                 <CloseIcon />
    //             </div>
    //         </div>
    //         <form className={styles.formUserSearch} onSubmit={handleSeachUser}>
    //             <TextField name="search" placeholder="Search user ..." className={styles.searchInput} value={searchText} onChange={changeSerchUser} />
    //             <Button type="submit" className={styles.searchButton}>
    //                 <SearchIcon
    //                     fontSize="small"
    //                     style={{
    //                         color: 'white',
    //                     }}
    //                 />
    //             </Button>
    //         </form>
    //         <div className={styles.overflowUser}>
    //             {listUsers && listUsers.length > 0 ? (
    //                 listUsers.map((user, i) => <User key={i} chat={chat} user={user} db={db} selectUserToChat={selectUserToChat} />)
    //             ) : (
    //                 <p className={styles.emptyText}>No User Found</p>
    //             )}
    //         </div>
    //     </>
    // );
};

export default UserContainer;
