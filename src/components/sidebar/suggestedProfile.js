import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';
export default function SuggestedProfile({spDocId, username, profileId, userId, loggedInUserDocId}){
    const [followed, setFollowed] = useState(false)

    const handleFollowUser = async () =>{
        setFollowed(true)

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
        await updateFollowedUserFollowers(spDocId, userId, false)


    }

    return !followed?(
        <div className='flex flex-row items-center align-items justify-between'>
            <div className='flex items-center justify-between'>
                <img
                    className='rounded-full w-8 flex mr-3'
                    src={`/images/${username}.jpg`}
                    alt={`${username} profile`}
                />
                <Link to={`/p/${username}`}>
                    <p className='font-bold text-sm'>{username}</p>
                </Link>
            </div>
                <button
                    className='text-xs font-bold text-blue-medium'
                    type='button'
                    onClick={handleFollowUser}
                >
                    follow
                </button>
        </div>
    ) : null
}

SuggestedProfile.propTypes = {
    spDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired,
}