import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/Routes'
import {doesUserNameExist} from '../services/firebase'

// require('firebase/compat/auth')

function Signup() {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState("")
    const [fullName, setfullName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const isInvalid = password === '' || emailAddress === ''

    const handleSignup = async (event)=>{
        event.preventDefault()

        const userNameExists = await doesUserNameExist( username )
        if ( userNameExists ){
            try{
                const createdUserResult = await firebase.auth().createUserWithEmailAndPassword( emailAddress, password )

                    await createdUserResult.user.updateProfile({
                        displayName: username   
                    })

                    await firebase.firestore().collection('users').add({
                        userId: createdUserResult.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: [],
                        followers: [],
                        dateCreated: Date.now()
                    })
                    history.push(ROUTES.DASHBOARD)

            } catch (error){
                setfullName('')
                setEmailAddress('')
                setPassword('')
                setError(error)
            }
        } else{
            setError('username already exists')
        }

    }

    useEffect(()=>{
        document.title = "Signup - Instagram"
    }, [])

    return (
        <>
            <div className="container flex mx-auto mx-w-screen-md md:w-9/12 lg:w-7/12 items-center h-screen">
                <div className="flex w-3/5">
                    <img src={'/images/iphone-with-profile.jpg'} alt='iPhone with instagram'/>
                </div>
                <div className="flex flex-col w-2/5 items-center rounded bg-white p-4 border border-gray-primary">
                    <h1 className="flex justify-center w-full">
                        <img src={'/images/logo.png'} alt="Instagram" className="mt-2 w-6/12"/>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignup} method="POST">
                        <input 
                            aria-label="Enter your username"
                            type="text" 
                            placeholder="Username" 
                            className="text-small text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({target}) => setUsername(target.value)}
                            value={username}
                        />
                        <input 
                            aria-label="Enter your full name"
                            type="text" 
                            placeholder="Full Name" 
                            className="text-small text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({target}) => setfullName(target.value)}
                            value={fullName}
                        />
                        <input 
                            aria-label="Enter your email address"
                            type="text" 
                            placeholder="Email address" 
                            className="text-small text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({target}) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <input 
                            aria-label="Enter your password"
                            type="password" 
                            placeholder="Password" 
                            className="text-small border border-gray-primary rounded text-gray-base w-full mr-3 py-5 px-4 h-2"
                            onChange={({target}) => setPassword(target.value)}
                            value={password}
                        />
                        <button 
                            disabled={isInvalid} 
                            type="submit" 
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold mt-2 ${isInvalid && 'opacity-50'} `}>
                                Sign Up
                        </button>
                    </form>
                    <div className="flex jsutify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary mt-2">
                        <p className="text-sm">
                            Have an account?{ ' ' }
                            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
                
            </div>        
        </>
    )
}

export default Signup