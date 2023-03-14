import React from 'react'
import { HiPaperAirplane } from 'react-icons/hi'

function MessageBody() {
    return (
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
    )
}

export default MessageBody
