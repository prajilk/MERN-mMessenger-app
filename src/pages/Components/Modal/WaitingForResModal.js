import './Modal.css'

function WaitingForResModal() {

    return (
        <div className='overlay'>
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