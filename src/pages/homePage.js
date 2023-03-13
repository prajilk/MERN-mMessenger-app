import axios from '../api/axios'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './homePage.css'
import { HiChatAlt2, HiPaperAirplane, HiSearch, HiUsers, HiX } from 'react-icons/hi';

function ChatsPage() {

    const navigate = useNavigate();

    const [chats, setChats] = useState(null);
    const [activeMessage, setActiveMessage] = useState(null);

    useEffect(() => {
        try {
            axios.get('/session')
                .then((res) => {
                    if (res.data.user === undefined) {
                        navigate('/signin')
                    } else {
                        console.log(res.data.user);
                        console.log('Data received');
                    }
                })
        } catch { }
    })

    const [width, setWidth] = useState('0');
    const [border, setBorder] = useState('0');
    const [icon, setIcon] = useState(<HiSearch />);

    function openSearch() {
        setWidth(width === '0' ? '100%' : '0');
        setBorder(border === '0' ? '1px solid #01acfc' : '0');
        setIcon(icon.type === HiSearch ? <HiX /> : <HiSearch />);
    }

    return (
        <div className="home-page">
            <div class="row justify-content-center w-100" style={{ height: '100%' }}>
                <div class="user-nav col-md-1">
                    <duv className="logo-container mt-3">
                        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="..." style={{ width: '45px' }} />
                    </duv>
                    <div className='nav-container'>
                        <div className='chat-frnd p-4 active'>
                            <p><HiChatAlt2 /></p>
                        </div>
                        <div className='chat-frnd p-4'>
                            <p><HiUsers /></p>
                        </div>
                    </div>
                    <div className='avatar-container'>
                        <img
                            src="https://ui-avatars.com/api/?name=Pohn+K&background=0D8ABC&color=fff"
                            alt=".."
                            width={'40px'} />
                    </div>
                </div>
                <div class="friends-nav col-md-3 p-3">
                    <div className='heading'>
                        <h4>Chats</h4>
                        <div className='search-field d-flex'>
                            <input type="text" style={{ width: width, border: border }} placeholder="Search chats" />
                            <button onClick={openSearch}>{icon}</button>
                        </div>
                    </div>
                    <div className="chat-list pt-4">
                        {!chats === null ? (
                            <div className="frnd-card active d-flex p-3 mb-2">
                                <img src="https://ui-avatars.com/api/?name=Pohn+K&background=0D8ABC&color=fff" alt=".." width={'50px'} />
                                <div className='name-conatiner ms-3'>
                                    <h6>Prajil</h6>
                                    <small>@prajil2001</small>
                                </div>
                            </div>
                        ) : (
                            <div className='no-chats'>
                                <h5>No chats available !</h5>
                                <p>Start a new chat now.</p>
                                <button>Chat now</button>
                            </div>
                        )}
                    </div>
                </div>
                <div class="chat-area col-md-8 p-3">
                    {!activeMessage === null ? (
                        <>
                            <div className="chat-header d-flex">
                                <img src="https://ui-avatars.com/api/?name=John&background=ff1493&color=fff" alt="..." width={'50px'} />
                                <div className='name-conatiner user-details ms-3'>
                                    <h6>John</h6>
                                    <small>@johnd134</small>
                                </div>
                            </div>
                            <div className='body-container'>
                                <div className="chat-body mt-4">
                                    <div class="chat-message">Hello</div>
                                    <div class="chat-message">How are you?</div>
                                    <div class="chat-message">I'm good, thank you. How about you skhjbsjhjjjj skk s i ks  k si s si si sisi jsi sknkis s is i si si si sis  sis i s si siks is is si siiks?</div>
                                    <div class="chat-message">I'm doing well, thanks for asking.</div>
                                    <div class="chat-message">That's great to hear!</div>
                                    <div class="chat-message">Yeah, I'm really happy about it.</div>
                                    <div class="chat-message">Anyway, what are your plans for the weekend?</div>
                                    <div class="chat-message">Not sure yet, maybe just relaxing at home. What about you?</div>
                                    <div class="chat-message">I'm planning to go hiking with some friends.</div>
                                    <div class="chat-message">That sounds like fun!</div>
                                </div>
                            </div>
                            <form>
                                <input type="text" name="" id="" placeholder='Message...' />
                                <button className='send-button'><HiPaperAirplane /></button>
                            </form>
                        </>
                    ) : (
                        <div className='no-message-active'>
                            <img src={process.env.PUBLIC_URL+'/logo_w.png'} alt="..." width={'200px'} />
                            <p>Start sending messages to friends.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatsPage;