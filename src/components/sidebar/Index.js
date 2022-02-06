import React from 'react'
import useUser from '../../hooks/use-user'
import User from './User'
import Suggestions from './Suggestions'

function Sidebar() {
    const {
        user: {fullName, username, userId, following, docId}
    } = useUser()
    console.log('fullName, username, userId, following, docId', fullName, username, userId, following, docId);
    return (
        <div className="p-4 relative" >
            <div className='fixed'>
                <User fullName={fullName} username={username}/>
                <Suggestions userId = {userId} following={following} loggedInUserDocId={docId} />
            </div>
        </div>
    )
}

export default Sidebar
