import axios from '../api/axios'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './homePage.css'
import './Components/FriendsBody/friendsNav.css'
import './Components/MessageBody/messageNav.css'
import './userNav.css'
import './Components/UserProfile/userProfile.css'
import { FaComments, FaPowerOff, FaUsers } from 'react-icons/fa';
import MessageBody from './Components/MessageBody/MessageBody';
import ChatBody from './Components/FriendsBody/ChatBody';
import FriendsBody from './Components/FriendsBody/FriendsBody';
import FindFriend from './Components/FriendsBody/FindFriend';
import UserProfile from './Components/UserProfile/UserProfile';
import { AppContext } from '../context/AppContext';
import Modal from './Components/Modal/Modal';
import { getAvatar } from '../api/avatarUrl';
import { SocketContext } from '../context/SocketContext';

function ChatsPage() {

    const navigate = useNavigate();

    const [chats, setChats] = useState([]);
    const [activeMessage, setActiveMessage] = useState(null);
    const [user, setUser] = useState({});
    const [navActive, setNavActive] = useState('chat');
    const [chatBody, setChatBody] = useState(true);
    const [modal, setModal] = useState(false);
    const [reqNotification, setReqNotification] = useState(false);

    const socket = useContext(SocketContext);

    useEffect(() => {
        try {
            axios.get('/session', {withCredentials: true}).then((res) => {
                    console.log(res.data.user);
                    console.log(res);
                    if (res.data.user === undefined) {
                        navigate('/signin')
                    } else {
                        setUser(res.data.user);
                        socket.emit('joinRoom', res.data.user._id);
                    }
                }).catch(({ code, message }) => {
                    navigate('/error', { state: { code, message }, replace: true })
                })
        } catch { }
    }, [])

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            const friendActive = document.getElementById('friend-active');
            const chatActive = document.getElementById('chat-active');

            friendActive.addEventListener('click', () => {
                setNavActive('friend');
                setChatBody(false);
            })

            chatActive.addEventListener('click', () => {
                setNavActive('chat');
                setChatBody(true);
            })

        }
    }, [user])

    function showUserProfile() {
        document.getElementById('user-profile-div').style.transform = 'translateX(0)';
    }

    const signOut = () => {
        setModal(true);
    }

    return (
        <div className="home-page">
            {Object.keys(user).length !== 0 ? <div className="row justify-content-center w-100" style={{ height: '100%' }}>
                <div className="user-nav col-md-1">
                    <div className="logo-container">
                        <img className='m-0' src={process.env.PUBLIC_URL + "/logo.png"} alt="..." style={{ width: '45px' }} />
                    </div>
                    <div className='nav-container'>
                        <div className={`chat-frnd p-4 ${navActive === 'chat' ? 'active' : ''}`} id='chat-active'>
                            <p><FaComments /></p>
                        </div>
                        <div className={`chat-frnd p-4 ${navActive === 'friend' ? 'active' : ''}`} id='friend-active'>
                            <p>
                                <FaUsers />
                                {reqNotification && <span className='notification-badge'></span>}
                            </p>
                        </div>
                    </div>
                    <div className='profile-container'>
                        <img
                            onClick={showUserProfile}
                            src={getAvatar(user.fullname, user.color)}
                            alt=".."
                            width={'40px'} />
                        <button className='trans-btn signout' onClick={signOut}><FaPowerOff /></button>
                    </div>
                </div>
                <div className="friends-nav col-md-4 p-0" id='friends-nav'>
                    <AppContext.Provider value={{ user, reqNotification, setReqNotification, chats, setChats, activeMessage, setActiveMessage }}>

                        <FindFriend setState={setChatBody} setNav={setNavActive} />
                        <UserProfile />
                        {chatBody ? <ChatBody setState={setChatBody} setNav={setNavActive} /> : <FriendsBody setState={setChatBody} setNav={setNavActive} />}

                    </AppContext.Provider>
                </div>
                <div className="chat-area col-md-7" id='chat-area'>
                    {activeMessage === null ? (
                        <div className='no-message-active'>
                            <img src={process.env.PUBLIC_URL + '/logo_w.png'} alt="..." width={'200px'} />
                            <p>Start sending messages to friends.</p>
                        </div>
                    ) : (
                        <AppContext.Provider value={{ activeMessage, setActiveMessage, chats, setChats, user }}>
                            <MessageBody />
                        </AppContext.Provider>
                    )}
                </div>
            </div> :
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            {modal && <Modal closeModal={setModal} user={user} />}
        </div>
    )
}

export default ChatsPage;