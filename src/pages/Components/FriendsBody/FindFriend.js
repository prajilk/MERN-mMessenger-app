import React, { useContext, useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi';
import { FaUserCheck, FaUserPlus } from 'react-icons/fa';
import axios from '../../../api/axios'
import { getAvatar } from '../../../api/avatarUrl';
import { SocketContext } from '../../../context/SocketContext';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

function FindFriend() {

    const [searchResults, setSearchResults] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [isResult, setIsResult] = useState(false);
    const [isResultLoaded, setIsResultLoaded] = useState(true);
    const [acceptReq, setAcceptReq] = useState(true);

    const socket = useContext(SocketContext);
    const { user, setReqNotification } = useContext(AppContext);

    const navigate = useNavigate();

    function hideFindFriend() {
        document.getElementById('find-friend-div').style.transform = 'translateX(100%)';
    }

    const searchData = (e) => {
        setIsResultLoaded(false);
        setSearchResults([]);
        let match = e.target.value.match(/^[a-zA-Z 0-9]*/);
        let match2 = e.target.value.match(/\s*/);
        if (match2[0] === e.target.value) {
            setSearchResults([]);
            setIsResult(false);
            setIsResultLoaded(true);
            return;
        }
        if (match[0] === e.target.value) {
            axios.post('/find-friends', { query: e.target.value })
                .then((res) => {
                    res.data.searchResults.length === 0 && setIsResult(true);
                    setIsResultLoaded(true);
                    setSearchResults(res.data.searchResults);
                })
            return;
        }
    }

    const Placeholder = () => {
        return (
            <div className='card p-2'>
                <div className="skeleton_container">
                    <div className="image-holder"></div>
                    <div className="name-holder p-2">
                        <div className="fullname_skeleton"></div>
                        <div className="username_skeleton"></div>
                    </div>
                    <div className="add-friend_skeleton"></div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        axios.get('/get-friends-requests')
        .then((res) => {
            setFriendRequests(res.data.frndReqs);
            if (res.data.frndReqs.length !== 0) setReqNotification(true);
        }).catch(({ code, message }) => {
            navigate('/error', { state: { code, message }, replace: true })
        })

        socket.on('friend-request-notification', (frndRequests)=>{
            setFriendRequests(frndRequests);
            setReqNotification(true);
        })
    }, [])

    const sendRequest = (recipientId, index) => {
        socket.emit('sent-request', user, recipientId);
        setSearchResults(prevResults => {
            const updatedResults = [...prevResults];
            updatedResults[index].status = "requests";
            return updatedResults;
        });
    }

    const acceptRequest = (recipientId, index) => {
        socket.emit('accept-request', user, recipientId);
        setSearchResults(prevResults => {
            const updatedResults = [...prevResults];
            updatedResults[index].status = "friends";
            return updatedResults;
        });
    }

    const rejectRequest = (recipientId, index) => {
        socket.emit('reject-request', user, recipientId);
        setSearchResults(prevResults => {
            const updatedResults = [...prevResults];
            updatedResults[index].status = null;
            return updatedResults;
        });
    }

    const acceptRequestFromReq = (recipientId, index) => {
        socket.emit('accept-request', user, recipientId);
        setAcceptReq(false);
        setReqNotification(false);
        setTimeout(()=>{
            setFriendRequests(prevResults => {
                const updatedResults = [...prevResults];
                updatedResults.splice(index, 1);
                return updatedResults;
            })
        },3000);
    }

    const rejectRequestFromReq = (recipientId, index) => {
        socket.emit('reject-request', user, recipientId);
        setFriendRequests(prevResults => {
            const updatedResults = [...prevResults];
            updatedResults.splice(index, 1);
            return updatedResults;
        });
        setReqNotification(false);
    }

    return (
        <div className='find-friend-div' id='find-friend-div'>
            <div className='find-friend-heading'>
                <h5>Find Friends</h5>
                <button className='findFriend closefind' onClick={() => hideFindFriend()}><HiX /></button>
            </div>
            <div className='find-friend-input'>
                <input type="text" name='find-friend' onChangeCapture={searchData} placeholder='Enter name' />
            </div>
            <div className="find-friends-body">
                {!isResultLoaded && <div className='find-friends-body-title'>
                    <h6>Search result</h6>
                    <Placeholder />
                </div>}
                {searchResults.length !== 0 ? <div className='find-friends-body-title'>
                    <h6>Search results</h6>
                    <div className="card">
                        {searchResults.map((data, index) => {
                            return (<div key={index}>
                                <div className='friends-card'>
                                    <img src={getAvatar(data.fullname, data.color)} alt="" width={'40px'} />
                                    <div className='name-conatiner ms-3'>
                                        <h6>{data.fullname}</h6>
                                        <small>@{data.username}</small>
                                    </div>

                                    {data.status === null && <div className='add-req'>
                                        <button onClick={() => sendRequest(data._id, index)} className='send-req'><FaUserPlus className='FaUserPlus' /></button>
                                    </div>}

                                    {data.status === 'requests' && <div className='position-relative'><FaUserCheck className='FaUserCheck' /></div>}

                                    {data.status === 'pending' && <div>
                                        <button className='cancel-req' onClick={() => rejectRequest(data._id, index)}><HiX /></button>
                                        <button className='frnd-card-lg-btn' onClick={() => acceptRequest(data._id, index)}>+ Accept</button>
                                    </div>}

                                    {data.status === 'friends' && <div>
                                        <button className='frnd-card-lg-btn'>Message</button>
                                    </div>}
                                </div>
                                <hr className='m-0' />
                            </div>)
                        })}
                    </div>
                </div> :
                    isResult &&
                    (<div className='find-friends-body-title'>
                        <h6>Search results</h6>
                        <div className="card">
                            <p className='m-2'>No results found!</p>
                        </div>
                    </div>)
                }
                {friendRequests.length !== 0 && <div className='find-friends-body-title'>
                    <h6>Friend requests</h6>
                    <div className="card">
                        {friendRequests.map((data, index) => {
                            return (<div key={index}>
                                <div className='friends-card'>
                                    <img src={getAvatar(data.fullname, data.color)} alt="" width={'40px'} />
                                    <div className='name-conatiner ms-3'>
                                        <h6>{data.fullname}</h6>
                                        <small>@{data.username}</small>
                                    </div>
                                    {acceptReq ? <div>
                                        <button className='cancel-req' onClick={()=> rejectRequestFromReq(data._id, index)}><HiX /></button>
                                        <button className='frnd-card-lg-btn' onClick={()=> acceptRequestFromReq(data._id, index)}>+ Accept</button>
                                    </div> : <div>
                                        <button className='frnd-card-lg-btn'>Message</button>
                                    </div>}
                                </div>
                                <hr className='m-0' />
                            </div>)
                        })}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default FindFriend;