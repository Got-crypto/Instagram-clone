import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { getSuggestedUSer } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggestedProfile";

export default function Suggestions({userId, following, loggedInUserDocId}){

    const [profiles, setProfiles] = useState(null)

    useEffect( () => {
        const suggestedUsers = async ()  =>{
            const response = await getSuggestedUSer(userId, following)
            setProfiles(response)
        }
        if(userId){
            suggestedUsers()
        }
    }, [userId, following])

    return !profiles ? (
        <Skeleton count={1} height={(150)} className="mt-5" />
    ) : profiles.length > 0 ? (
        <>
            <div className="rounded flex flex-col">
                <div className="text-sm flex items-center align-items justify-between mb-2">
                    <p className="font-bold text-gray-base">Suggested users</p>
                </div>
                <div className="mt-4 grid gap-5">
                    {profiles.map( profile => (
                        <SuggestedProfile
                            key={profile.docId}
                            spDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            userId={userId}
                            loggedInUserDocId={loggedInUserDocId}
                        />
                        
                    ))}
                </div>
            </div>
        </>
    ) : null
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
}