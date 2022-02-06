import { useEffect, useState } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/Routes'
import Header from '../components/Header'
import UserProfile from '../components/profile/index'

export default function Profile(){
    const {username} = useParams()
    const [userExists, setUserExists] = useState(false)
    const history = useHistory()
    const [user, setUser] = useState(null)

    useEffect (()=>{
        async function checkUserExists(){
            const [user] = await getUserByUsername(username.toLowerCase())
            if(user.userId){
                setUser(user)
                setUserExists(true)
            }else{
                history.push(ROUTES.NOT_FOUND)
            }
        }
        checkUserExists()
    }, [username, history])

    return userExists ? (
        <div className='bg-gray-background'>
            <Header/>
            <div className='mx-auto max-w-screen-lg'>
                <UserProfile user={user}/>
            </div>
        </div>
    ) : null
}