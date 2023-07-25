import './Modal.css'

function WaitingForResModal() {

    return (
        <div className='overlay'>
            <p className='server-loading'>! The server is hosted on Render.com's free tier, and while it takes a few minutes to load up initially, once it's up and running, everything runs smoothly.</p>
            <div className="waitingForResModal">
                <div className="modalBody">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForResModal;